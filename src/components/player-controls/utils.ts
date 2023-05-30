type Params = {
  trackPosition: number;
  isPrevDisabled: boolean;
  onPrevDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isNextDisabled: boolean;
  onNextDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  queueLength: number;
};

export const checkPostionOfTrack = ({
  trackPosition,
  isPrevDisabled,
  onPrevDisabled,
  isNextDisabled,
  onNextDisabled,
  queueLength,
}: Params) => {
  if (trackPosition === 0) {
    onPrevDisabled(true);
  } else {
    if (isPrevDisabled) {
      onPrevDisabled(false);
    }
  }

  if (trackPosition === queueLength - 1) {
    onNextDisabled(true);
  } else {
    if (isNextDisabled) {
      onNextDisabled(false);
    }
  }
};
