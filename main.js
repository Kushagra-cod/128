song="";

function preload() {
    song=loadSoung("music.mp3");
}
scoreRightWrist=0;
scoreLeftWrist=0;

RightWristX=0;
RightWristY=0;

LeftWristX=0;
LeftWristY=0;

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('Pose',gotPoses);
}

function modelLoaded(){
    console.log('poseNet is initialised');
}

function gotPoses(results){

    if (results.lenght>0){
        console.log(results);
        scoreRightWrist=results[0].pose.keypoints[10].score;
        scoreLeftWrist=results[0].pose.keypoints[9].score; 
        console.log("scoreRightWrist="+scoreRightWrist+"scoreLeftWrist="+scoreLeftWrist);

        RightWristX=results[0].pose.RightWrist.x;
        RightWristY=results[0].pose.RightWrist.y;
        console.log("RightWristX="+RightWristX+"RightWristY="+RightWristY);

        LeftWristX=results[0].pose.LeftWrist.x;
       LeftWristY=results[0].pose.LeftWrist.y;
        console.log("LefttWristX="+LefttWristX+"LefttWristY="+LefttWristY);
    }
}
function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightWrist > 0.2){
        circle(RightWristX,RightWristY,20);

        if(RightWristY>0 && RightWristY<=100){
            document.getElementById("speed").innerHTML="speed=0.5x";
            song.rate(0.5);
        }
        else if(RightWristY>100 && RightWristY<=200){
document.getElementById('speed').innerHTML="speed=1x";
song.rate(1);
        }
        else if(RightWristY>200 && RightWristY<=300){
            document.getElementById('speed').innerHTML="speed=1.5x";
            song.rate(1.5);
        }
        else if(RightWristY>300 && RightWristY<=400){
            document.getElementById('speed').innerHTML="speed=2x";
            song.rate(2);
        }
        else if(RightWristY>400){
        document.getElementById('speed').innerHTML="speed=2.5x";
        song.rate(2.5);
        }
    }
    if(scoreLeftWrist>0.2){
      circle(LeftWristX,LeftWristY,20);
      InNumberLeftWristY = Number(LeftWristY);
      remove_decimal=floor(InNumberLeftWristY);
      volume=remove_decimal/500;
      document.getElementById("volume").innerHTML="volume="+volume;
      song.setVolume(volume);
    }
}
function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}