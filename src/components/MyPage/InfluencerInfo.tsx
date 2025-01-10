import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Avatar,
  Chip,
  Stack,
} from "@mui/material";

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

interface InfluencerInfoProps {
  influencer: Influencer | null;
}

const InfluencerInfo: React.FC<InfluencerInfoProps> = ({ influencer }) => {
  console.log("인플루언서 인포", influencer);
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Card
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "18px",
          boxShadow: "none",
        }}
      >
        <Box
          sx={{
            height: 150,
            backgroundImage: `url(${influencer?.banner_picture || 'https://via.placeholder.com/400x120'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <CardContent
          sx={{
            position: "relative",
            zIndex: 1,
            paddingTop: 6,
            paddingBottom: 6,
            padding: "0px 10%",
            textAlign: "center",
          }}
        >
          <Avatar
            src={influencer?.User.profile_picture || 'https://via.placeholder.com/120'}
            alt={influencer?.User.username || 'User'}
            sx={{
              width: 120,
              height: 120,
              margin: '-90px auto 10px',
              marginBottom: "5%",
              backgroundColor: "white",
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              border: '3px solid white',
            }}
          />
          <Typography variant="h6" fontWeight="bold">
            {influencer?.User.username || '닉네임 없음'}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            {influencer?.User.about_me || '소개가 없습니다.'}
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2 }}>
            <Chip
              label={`카테고리: ${influencer?.category || '카테고리 없음'}`}
              color="primary"
              variant="outlined"
            />
            <Chip
              label={`팔로워 수: ${influencer?.follower.length || 0}`}
              color="secondary"
              variant="outlined"
            />
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default InfluencerInfo;
