import React, { useEffect, useState } from "react";
import AgoraRTC, { IAgoraRTCClient, ICameraVideoTrack, IMicrophoneAudioTrack, IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import "./VideoConference.css";

const APP_ID = "d880d09eeb6e4f6d82534a48335e8fba"; // Replace with your Agora App ID
const TOKEN = "007eJxTYJi//aYZV8xD1tytRz+ei1vy80XvNoYTEbct/+00szKM1p+gwJBiYWGQYmCZmppklmqSZpZiYWRqbJJoYmFsbJpqkZaUqOW+J70hkJGB65snIyMDBIL4bAyuKaUepUkMDAAU2SEt"; // Replace with your token if required
const CHANNEL_NAME = "EduHub"; // Replace with your Agora channel name

export default function VideoConference() {
  const [rtcClient, setRtcClient] = useState<IAgoraRTCClient | null>(null);
  const [localTracks, setLocalTracks] = useState<[IMicrophoneAudioTrack, ICameraVideoTrack] | null>(null);
  const [remoteUsers, setRemoteUsers] = useState<Record<string, IAgoraRTCRemoteUser>>({});

  useEffect(() => {
    const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    setRtcClient(client);

    return () => {
      client.leave().catch(console.error);
    };
  }, []);

  const joinChannel = async () => {
    if (!rtcClient) return;

    await rtcClient.join(APP_ID, CHANNEL_NAME, TOKEN, null);

    const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    const videoTrack = await AgoraRTC.createCameraVideoTrack();

    setLocalTracks([audioTrack, videoTrack]);

    await rtcClient.publish([audioTrack, videoTrack]);
    videoTrack.play("local-video");

    rtcClient.on("user-published", async (user, mediaType) => {
      await rtcClient.subscribe(user, mediaType);
      if (mediaType === "video" && user.videoTrack) {
        user.videoTrack.play(`remote-video-${user.uid}`);
      }
      setRemoteUsers((prev) => ({ ...prev, [user.uid]: user }));
    });

    rtcClient.on("user-unpublished", (user) => {
      setRemoteUsers((prev) => {
        const updatedUsers = { ...prev };
        delete updatedUsers[user.uid];
        return updatedUsers;
      });
    });
  };

  const leaveChannel = async () => {
    if (!rtcClient || !localTracks) return;

    localTracks.forEach((track) => {
      track.stop();
      track.close();
    });

    await rtcClient.leave();
    setLocalTracks(null);
    setRemoteUsers({});
  };

  return (
    <div className="video-container">
      <center>
      <h2>Video Conference</h2></center>
      <div className="video-grid">
        <div id="local-video" className="video-box"></div>
        {Object.keys(remoteUsers).map((uid, index) => (
          index < 4 && <div key={uid} id={`remote-video-${uid}`} className="video-box"></div> // Limit to 3 remote videos
        ))}
      </div>
      <div className="controls">
        <button onClick={joinChannel}>Join</button>
        <button onClick={leaveChannel}>Leave</button>
      </div>
    </div>
  );
}
