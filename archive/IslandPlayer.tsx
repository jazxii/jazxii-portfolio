"use client";

import { useEffect, useRef, useState } from "react";

type Track = { title: string; artist: string; src: string };

/**
 * Original, royalty-free ambient loops generated for this site. The
 * "Intro · M83" label is a visual homage to the mockup — it is NOT the real
 * M83 recording (that, and its cover art, are copyrighted). Swap TRACKS for
 * licensed audio + metadata anytime; the player logic is source-agnostic.
 */
const TRACKS: Track[] = [
  { title: "Intro", artist: "M83", src: "/audio/intro.mp3" },
  { title: "Drift", artist: "jazxii", src: "/audio/drift.mp3" },
  { title: "Halcyon", artist: "jazxii", src: "/audio/halcyon.mp3" },
];

function fmt(s: number) {
  if (!Number.isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
}

/**
 * A real, accessible "now playing" player that lives inside the dynamic
 * island. Every control is a labelled <button> / slider backed by an actual
 * <audio> element — nothing is fake. Audio is preload="none" and never
 * autoplays (perf budget + WCAG 1.4.2); it only starts on a user gesture.
 * Track changes are announced via a polite live region. State changes happen
 * in event handlers / media events, not in effect bodies, to satisfy the
 * React-compiler set-state-in-effect rule.
 */
export function IslandPlayer({
  onPlayingChange,
}: {
  onPlayingChange?: (playing: boolean) => void;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playOnLoad = useRef(false);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [status, setStatus] = useState("");

  const track = TRACKS[index];

  // Media listeners (attached once). They setState from events — not from the
  // effect body — so the playback state always mirrors the real element.
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setCurrent(a.currentTime);
    const onMeta = () => {
      setDuration(a.duration);
      setCurrent(a.currentTime);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => {
      playOnLoad.current = true;
      setCurrent(0);
      setDuration(0);
      setIndex((i) => (i + 1) % TRACKS.length);
    };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("durationchange", onMeta);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onEnded);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("durationchange", onMeta);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onEnded);
    };
  }, []);

  // Point the element at the current track. Only auto-load/play when the user
  // was already listening (keeps preload="none" honest on first paint).
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.src = track.src;
    if (playOnLoad.current) {
      playOnLoad.current = false;
      a.load();
      a.play().catch(() => {});
    }
  }, [track.src]);

  // Surface real play state so the island EQ animates only while playing.
  useEffect(() => {
    onPlayingChange?.(playing);
  }, [playing, onPlayingChange]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      setStatus(`Playing ${track.title} by ${track.artist}`);
      a.play().catch(() => setStatus("Couldn’t start playback."));
    } else {
      a.pause();
    }
  };

  const go = (delta: number) => {
    const a = audioRef.current;
    // "Previous" restarts the current track first if you're past the intro.
    if (delta < 0 && a && a.currentTime > 3) {
      a.currentTime = 0;
      setCurrent(0);
      return;
    }
    const next = (index + delta + TRACKS.length) % TRACKS.length;
    playOnLoad.current = playing;
    setCurrent(0);
    setDuration(0);
    setIndex(next);
    setStatus(`Now playing: ${TRACKS[next].title} by ${TRACKS[next].artist}`);
  };

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const a = audioRef.current;
    const v = Number(e.target.value);
    if (a) a.currentTime = v;
    setCurrent(v);
  };

  const toggleLike = () => setLiked((m) => ({ ...m, [index]: !m[index] }));

  const onRemote = async () => {
    const a = audioRef.current;
    if (!a) return;
    const remote = a.remote as RemotePlayback | undefined;
    try {
      if (remote && typeof remote.prompt === "function") {
        await remote.prompt();
      } else {
        setStatus("AirPlay isn’t available in this browser.");
      }
    } catch {
      setStatus("No playback devices found.");
    }
  };

  const isLiked = !!liked[index];
  const pct = duration ? (current / duration) * 100 : 0;

  return (
    <div className="island-player">
      <audio ref={audioRef} preload="none" />
      {/* polite announcements: track changes, playback start, AirPlay state */}
      <p className="sr-only" aria-live="polite">
        {status}
      </p>

      <div className="ip-head">
        <span className="ip-art" aria-hidden="true" />
        <span className="ip-meta">
          <span className="ip-title">{track.title}</span>
          <span className="ip-artist">{track.artist}</span>
        </span>
        <span className="ip-dots" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </span>
      </div>

      <div className="ip-scrub">
        <span className="ip-time">{fmt(current)}</span>
        <input
          type="range"
          className="ip-range"
          min={0}
          max={duration || 0.1}
          step={0.1}
          value={Math.min(current, duration || 0)}
          onChange={onSeek}
          aria-label="Seek"
          aria-valuetext={`${fmt(current)} of ${fmt(duration)}`}
          style={{ "--pct": `${pct}%` } as React.CSSProperties}
        />
        <span className="ip-time">−{fmt(Math.max(duration - current, 0))}</span>
      </div>

      <div className="ip-controls">
        <button
          type="button"
          className={`ip-btn ${isLiked ? "is-liked" : ""}`}
          aria-pressed={isLiked}
          onClick={toggleLike}
          aria-label={isLiked ? "Remove from favourites" : "Add to favourites"}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              d="M12 17.3l-5.4 3.2 1.4-6.1L3 9.9l6.2-.5L12 3.7l2.8 5.7 6.2.5-5 4.5 1.4 6.1z"
              fill={isLiked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          type="button"
          className="ip-btn"
          onClick={() => go(-1)}
          aria-label="Previous track"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="currentColor">
            <path d="M6 5h2v14H6zM20 5L9.5 12 20 19z" />
          </svg>
        </button>

        <button
          type="button"
          className="ip-btn ip-play"
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="currentColor">
              <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="currentColor">
              <path d="M8 5l12 7-12 7z" />
            </svg>
          )}
        </button>

        <button
          type="button"
          className="ip-btn"
          onClick={() => go(1)}
          aria-label="Next track"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="currentColor">
            <path d="M16 5h2v14h-2zM4 5l10.5 7L4 19z" />
          </svg>
        </button>

        <button
          type="button"
          className="ip-btn"
          onClick={onRemote}
          aria-label="AirPlay or cast"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path
              d="M4 5h16v10h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M12 14l5 6H7z" fill="currentColor" />
          </svg>
        </button>
      </div>
    </div>
  );
}
