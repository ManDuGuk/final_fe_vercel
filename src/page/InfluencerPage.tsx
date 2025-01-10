import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import InfluencerInfo from "../components/MyPage/InfluencerInfo";
import { fetchInfluencer, fetchUserFeeds } from "../util/myPageApi";
import MyMenu from "../components/MyPage/MyMenu";
import { Outlet } from "react-router-dom";
import Notification from "../components/common/Notification"; // Notification 컴포넌트 import
import { Box, Typography } from "@mui/material";
import { ImageGrid } from "../components/common/ImageGrid";
import { imageParse } from "../util/imageParse";

interface User {
  id: number;
  username: string;
  email: string;
  about_me: string;
  profile_picture: string;
}

interface Influencer {
  id: number;
  banner_picture: string;
  category: string;
  follower: string[];
  User: User;
}

const InfluencerPage = () => {
  const { id } = useParams<{ id: string }>();
  const [influencer, setInfluencer] = useState<Influencer | null>(null);
  const [feeds, setFeeds] = useState<any[]>([]);
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleNotificationClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  const showNotification = (message: string, severity: "success" | "error") => {
    setNotification({ open: true, message, severity });
  };

  const fetchData = useCallback(async () => {
    if (!id) {
      console.error("No influencer ID found");
      setInfluencer(null);
      return;
    }

    try {
      const influencerInfo = await fetchInfluencer(id);
      setInfluencer(influencerInfo);
      console.log(influencerInfo);
    } catch (error) {
      console.error("Error fetching influencer info:", error);
      setInfluencer(null);
    }
  }, [id]);

  const fetchFeeds = useCallback(async (userId: number) => {
    try {
      const userFeeds = await fetchUserFeeds(userId);
      setFeeds(userFeeds);
      console.log(userFeeds);
    } catch (error) {
      console.error("Error fetching user feeds:", error);
      showNotification("피드를 불러오는 중 오류가 발생했습니다.", "error");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (influencer) {
      fetchFeeds(influencer.User.id);
    }
  }, [influencer, fetchFeeds]);

  const renderFeeds = () => {
    if (feeds && Array.isArray(feeds) && feeds.length > 0) {
      const items = feeds.map((feed) => ({
        id: feed.id,
        imageUrl: imageParse(feed.images),
        overlayContent: (
          <>
            <Box
              sx={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                padding: 1,
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography align="center" variant="h6">
                {feed.likes ? feed.likes.length : 0}
              </Typography>
            </Box>
            <Typography
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2, // 최대 2줄로 제한
                fontSize: "10px",
              }}
            >
              {feed.content}
            </Typography>
          </>
        ),
      }));

      return (
        <Box
          sx={{
            padding: "0px 36px",
            marginBottom: "5%",
          }}
        >
          <ImageGrid items={items} />
        </Box>
      );
    } else {
      return (
        <Typography variant="h6" color="textSecondary" marginBottom={"30px"}>
          작성한 피드가 없습니다.
        </Typography>
      );
    }
  };

  return (
    <div
      style={{
        margin: "0 5%",
        marginTop: "32px",
        marginBottom: "32px",
        backgroundColor: "white",
        border: "none",
        borderRadius: "18px",
        boxShadow: "rgba(153, 129, 172, 0.3) 0px 7px 29px 0px",
      }}
    >
      {influencer ? (
        <>
          <InfluencerInfo influencer={influencer} />
          {renderFeeds()}
        </>
      ) : (
        <p>Loading...</p>
      )}
      <Outlet key={id} />
      {/* Notification 컴포넌트 추가 */}
      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={handleNotificationClose}
      />
    </div>
  );
};

export default InfluencerPage;
