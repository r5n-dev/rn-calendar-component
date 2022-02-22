import { useCalendarConfig, useCallbacksState } from '../store';

const useArrow = () => {
  const onArrowPress = useCallbacksState((state) => state.onArrowPress);
  const listWidth = useCalendarConfig().listWidth;

  return { onArrowPress, listWidth };
};

export default useArrow;
