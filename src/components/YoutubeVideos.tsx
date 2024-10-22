'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// 비디오 데이터 타입 정의
interface VideoSnippet {
  title: string;
  thumbnails: {
    default: {
      url: string;
    };
  };
}

interface VideoItem {
  id: {
    videoId: string;
  };
  snippet: VideoSnippet;
}

const YouTubeVideos = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 검색어가 변경되면 비디오 데이터를 가져옴
  useEffect(() => {
    if (query) {
      fetchVideos(query);
    }
  }, [query]);

  // API 라우트를 통해 비디오 데이터를 가져옴
  const fetchVideos = async (searchQuery: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/youtube?query=${searchQuery}`);
      setVideos(response.data); // 서버에서 받은 비디오 데이터 상태에 저장
    } catch (error) {
      setError('Failed to fetch videos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const queryValue = formData.get('query') as string;
    setQuery(queryValue);
  };

  return (
    <Container>
      <Title>YouTube Search Videos</Title>

      <SearchForm onSubmit={handleSearch}>
        <SearchInput
          type='text'
          name='query'
          placeholder='Search for YouTube videos...'
          defaultValue={query}
        />
        <SearchButton type='submit'>Search</SearchButton>
      </SearchForm>

      {loading && <LoadingText>Loading...</LoadingText>}
      {error && <ErrorText>{error}</ErrorText>}

      {videos.length > 0 ? (
        <VideoGrid>
          {videos.map((video) => (
            <VideoItem key={video.id.videoId}>
              <VideoIframe
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                title={video.snippet.title}
                allowFullScreen
              />
              <VideoTitle>{video.snippet.title}</VideoTitle>
            </VideoItem>
          ))}
        </VideoGrid>
      ) : (
        !loading && (
          <NoResultsText>No videos found. Please try again.</NoResultsText>
        )
      )}
    </Container>
  );
};

export default YouTubeVideos;

// Styled components
const Container = styled.div`
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
  color: black;
`;

const SearchButton = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const LoadingText = styled.p`
  text-align: center;
  font-size: 18px;
`;

const ErrorText = styled.p`
  text-align: center;
  color: red;
  font-size: 18px;
`;

const NoResultsText = styled.p`
  text-align: center;
  font-size: 18px;
  color: gray;
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  padding: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

const VideoItem = styled.div`
  text-align: center;
`;

const VideoIframe = styled.iframe`
  width: 100%;
  height: auto;
  max-width: 200px;
  aspect-ratio: 16/9; /* 16:9 비율로 설정 */
  border: none;
`;

const VideoTitle = styled.p`
  margin-top: 10px;
  font-size: 16px;
  color: #333;
  word-wrap: break-word;
  white-space: normal;
`;
