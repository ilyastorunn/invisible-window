import { useEffect, useState, useCallback } from 'react';
import { VideoFilter, SyncMessage } from '../types';

const CHANNEL_NAME = 'invisible_window_sync';

export const useBroadcastSync = () => {
  const [filter, setFilter] = useState<VideoFilter>(VideoFilter.None);
  const [channel, setChannel] = useState<BroadcastChannel | null>(null);

  useEffect(() => {
    const bc = new BroadcastChannel(CHANNEL_NAME);
    setChannel(bc);

    bc.onmessage = (event: MessageEvent<SyncMessage>) => {
      if (event.data.type === 'FILTER_CHANGE') {
        setFilter(event.data.payload);
      }
    };

    return () => {
      bc.close();
    };
  }, []);

  const broadcastFilterChange = useCallback((newFilter: VideoFilter) => {
    setFilter(newFilter);
    channel?.postMessage({
      type: 'FILTER_CHANGE',
      payload: newFilter
    } as SyncMessage);
  }, [channel]);

  return {
    filter,
    setFilter: broadcastFilterChange
  };
};