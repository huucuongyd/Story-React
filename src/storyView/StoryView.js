import { Card, CardContent, Box, Button, Avatar, LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";


export function StoryView () {
    const styleButton = {
        flex:1,
        backgroundColor:'black'
    }
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isRunning, setIsRunning] = useState(true);

    const stories = useSelector((state) => state.stories);
    
    let video = 6

    let storyArr = []
    for(var i=0;i< stories.length;i++){
      storyArr.push(0)
    }
    const [progress, setProgress] = useState(storyArr);

    const goToPreviousIndex = () => {
        setIsRunning(true)
        setCurrentIndex((prevIndex) => prevIndex - 1);
        setProgress((prevProgress) => {
          const updatedProgress = prevProgress.map((value, index) => {
            if (index >= currentIndex - 1) {
              return 0;
            }
            return value;
          });
    
          return updatedProgress;
        });
      };
    
      const goToNextIndex = () => {
        setIsRunning(true)
        setCurrentIndex((prevIndex) => {
          if (prevIndex < progress.length - 1 && progress[prevIndex] < 100) {
            setProgress((prevProgress) => {
              const updatedProgress = [...prevProgress];
              updatedProgress[prevIndex] = 100;
              return updatedProgress;
            });
          }
          return prevIndex + 1;
        });
      };

    useEffect(() => {

        if (isRunning) {
    
          const interval = setInterval(() => {
            setProgress((prevProgress) => {
              const updatedProgress = prevProgress.map((value, index) => {
                if (index === currentIndex) {
                  if (value < 100) {
                    return value + 1;
                  } else {
                    if (currentIndex !== progress.length - 1) {
                      setCurrentIndex(currentIndex + 1);
                    }
                    return value;
                  }
                } else {
                  if (index > currentIndex) {
                    return 0;
                  }
                }
                return value;
              });
              return updatedProgress;
            });
          }, 50);
          //video === null? 50:(video.duration*10)
          // fix after add video
          return () => {
            clearInterval(interval);
          };
        }
      }, [currentIndex, progress.length, isRunning, video]);

      const currentStory = stories[currentIndex];

    return (
        <Box display={"flex"} sx={{backgroundColor:'black', height:'100vh'}}>
            <Button style={styleButton} onClick={goToPreviousIndex} disabled={currentIndex === 0}></Button>
            <Card 
                sx={{ 
                    height: '90vh', 
                    width: '50vh', 
                    marginTop: '20px'
                }}

                style={{ 
                    backgroundImage: `url(${currentStory.media})`, 
                    backgroundSize: 'contain', 
                    backgroundPosition: 'center' , 
                    backgroundRepeat:'no-repeat', 
                    backgroundColor:'GrayText'
                }}
                >
                <CardContent>
                    <Box display={'flex'} marginBottom={'10px'}>
                        {progress.map((value, index) => (
                        <LinearProgress
                            key={index}
                            variant="determinate"
                            value={value}
                            style={{flex:'1', marginRight:'3px', transition:'0.005s ease'}}
                        />))}
                    </Box>

                    <Avatar alt="User Avatar" src={currentStory.avatarUser} />
                </CardContent>
            </Card>
            <Button style={styleButton} onClick={goToNextIndex} disabled={currentIndex === progress.length - 1}></Button>
        </Box>

    )
}