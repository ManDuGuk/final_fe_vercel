import { useCallback, useEffect, useState } from "react";
import { Feed, FollowingStatus } from "../../types/homeFeedType";
import axios from "axios";
import { getInfluencerResponse, patchToggleIsFollowingInfluencer, postUserResponse } from '../../api/requests/useFollowingStatusApi';
import { useLoggedInUserStore, useLoginAlertStore } from "../../store/authStore";

export const useFollow = (
  feeds: Feed[],
  initialStatus: FollowingStatus = {}
) => {
  const loggedInUser = useLoggedInUserStore((state) => state.loggedInUser);
  const setLoggedInUser = useLoggedInUserStore((state) => state.setLoggedInUser);
  const [followingStatus, setFollowingStatus] = useState<FollowingStatus>(initialStatus); //로그인된 유저가 피드에 노출된 인플루언서의 팔로워 여부를 저장하는 state
  const setOpenLoginAlert = useLoginAlertStore((state) => state.setOpenLoginAlert);

  const toggleIsFollowingInfluencer = useCallback(
    async (feed: Feed) => {
      if (!loggedInUser?.userId) {
        console.error("로그인된 사용자가 없습니다.");
        setOpenLoginAlert(true);
        return;
      }
      try {
        // 현재 팔로우 상태 확인
        const isFollowing = followingStatus[feed.influencer_id] || 0;

        // 새로운 팔로우 배열 생성
        const newFollowList = isFollowing
          ? loggedInUser.follow.filter((id) => id !== feed.influencer_id) // 언팔로우
          : [...loggedInUser.follow, feed.influencer_id]; // 팔로우

        const data = {
          userId: loggedInUser.userId,
          influencerId: feed.influencer_id,
          isFollowing: !isFollowing,
        }
        const response = await patchToggleIsFollowingInfluencer(data);
        if (!response || !response.data) {
          console.error('User patchToggleIsFollowingInfluencer is not available.');
          return; // 빈 결과 반환
        }


        // Zustand 상태 업데이트
        setLoggedInUser({
          ...loggedInUser,
          follow: newFollowList,
        });

        // 팔로우 상태 업데이트
        setFollowingStatus((prev) => ({
          ...prev,
          [feed.influencer_id]: prev[feed.influencer_id] === 0 ? 1 : 0,
        }));

      } catch (error) {
        console.error("팔로우 상태를 업데이트하는 중 오류 발생:", error);
      }
    },
    [followingStatus, loggedInUser]) // 의존성 관리;

  useEffect(() => {
    const checkFollowing = async () => {
      if (feeds.length <= 0) return;
      const newFollowingStatuses: FollowingStatus = {};

      for (const feed of feeds) {
        if (!loggedInUser?.follow.includes(feed.influencer_id)) {
          newFollowingStatuses[feed.influencer_id] = 0; // 팔로우하지 않음
          continue;
        }

        const params = {
          influencerId: feed.influencer_id
        }
        const influencerResponse = await getInfluencerResponse(params);
        if (!influencerResponse || !influencerResponse.data) {
          console.error('User getInfluencerResponse is not available.');
          return; // 빈 결과 반환
        }

        const data = {
          userId: loggedInUser?.userId
        }
        const userResponse = await postUserResponse(data);
        if (!userResponse || !userResponse.data) {
          console.error('User postUserResponse is not available.');
          return; // 빈 결과 반환
        }

        const influencerProducts: number[] = influencerResponse.data.map((item: { id: number }) => item.id); /// 타입 지정 필수
        const userProducts: number[] = Array.isArray(userResponse.data) ? userResponse.data.map((item: { product_id: number }) => item.product_id) : [];

        // 겹치는 제품 여부 확인
        const hasCommonProduct = influencerProducts.some((pi) =>
          userProducts.includes(pi)
        );

        newFollowingStatuses[feed.influencer_id] = hasCommonProduct ? 2 : 1; // 2: 공통 상품 있음, 1: 없음
      }
      // 여러 객체를 병합하여 상태 업데이트
      setFollowingStatus((prevStatus) => ({
        ...prevStatus,
        ...newFollowingStatuses, // 새 상태 병합
      }));
    };
    checkFollowing();
  }, [feeds.length]);

  console.log(followingStatus, "followingStatus");

  return { followingStatus, toggleIsFollowingInfluencer };
}