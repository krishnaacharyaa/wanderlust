import React from 'react';
import { imageUrls } from '@/constants/images';
interface ModalProps {
  selectedImage: string;
  modal: boolean;
  handleImageSelect: (imageUrl: string) => void;
  handleSelector: () => void;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalComponent: React.FC<ModalProps> = ({
  selectedImage,
  handleImageSelect,
  handleSelector,
  setModal,
  modal,
}) => {
  return (
    <>
      {modal && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="false"
        >
          <div className="fixed inset-0 bg-slate-800/50 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-light text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-light px-4 pb-4 pt-5 dark:bg-dark sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:text-left">
                      <h3
                        className="text-base font-semibold leading-6 text-light-primary dark:text-dark-primary"
                        id="modal-title"
                      >
                        Choose a post cover image
                      </h3>
                      <div className="mt-2">
                        <div className="grid grid-cols-3 gap-4">
                          {imageUrls.map((imageUrl) => (
                            <div
                              key={imageUrl}
                              className={`aspect-square cursor-pointer overflow-clip border ${
                                selectedImage === imageUrl
                                  ? 'border-4 border-blue-300'
                                  : 'border-slate-300'
                              } rounded-md`}
                              onClick={() => handleImageSelect(imageUrl)}
                            >
                              <img
                                src={imageUrl}
                                alt={`Image ${imageUrl}`}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-light px-4 py-3 dark:bg-dark sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    name="imageLink"
                    className="active:scale-click inline-flex w-full justify-center rounded-md bg-light-primary px-3 py-2 text-sm font-semibold text-light shadow-sm hover:bg-light-secondary dark:bg-dark-primary dark:text-dark dark:hover:bg-dark-secondary sm:ml-3 sm:w-auto"
                    onClick={handleSelector}
                  >
                    Select
                  </button>
                  <button
                    type="button"
                    className="active:scale-click mt-3 inline-flex w-full justify-center rounded-md bg-light px-3 py-2 text-sm font-semibold text-light-primary shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-200 dark:bg-dark dark:text-dark-primary dark:hover:bg-dark-secondary/25 sm:mt-0 sm:w-auto"
                    onClick={() => {
                      setModal(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalComponent;
