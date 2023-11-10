import React from 'react';
import { imageUrls } from '../constants/images';
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3
                        className="text-base font-semibold leading-6 text-gray-900"
                        id="modal-title"
                      >
                        Select Post Image
                      </h3>
                      <div className="mt-2">
                        <div className="grid grid-cols-3 gap-4">
                          {imageUrls.map((imageUrl) => (
                            <div
                              key={imageUrl}
                              className={`cursor-pointer p-2 border ${
                                selectedImage === imageUrl ? 'border-blue-500' : 'border-gray-300'
                              } rounded-md`}
                              onClick={() => handleImageSelect(imageUrl)}
                            >
                              <img
                                src={imageUrl}
                                alt={`Image ${imageUrl}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    name="imageLink"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                    onClick={handleSelector}
                  >
                    Select
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
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
