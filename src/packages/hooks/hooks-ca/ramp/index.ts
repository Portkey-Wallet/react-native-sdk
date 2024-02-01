export const useRampEntryShow = () => {
  const isBuySectionShow = true;
  const isSellSectionShow = true;

  const isRampShow = isBuySectionShow || isSellSectionShow;

  const refreshRampShow = async (isFetch = true) => {
    return {
      isRampShow,
      isBuySectionShow,
      isSellSectionShow,
    };
  };

  return {
    isRampShow,
    isBuySectionShow,
    isSellSectionShow,
    refreshRampShow,
  };
};

export * from './buy';
export * from './sell';
