'use client';
import { updatePhase } from '@/app/server-actions/supabase/client';
import { ModalUpdatePhase, UpdateModalPhase } from '@/types/types';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
export function UpdatePhaseModal({
  showModalUpdate,
  setShowModalUpdate,
  phase
}: ModalUpdatePhase) {
  const [dataUpdatePhase, setDataUpdatePhase] = useState<UpdateModalPhase>({
    name: phase.name || '',
    description: phase.description || '',
    startDate: phase.startDate ? new Date(phase.startDate) : new Date(),
    endDate: phase.endDate ? new Date(phase.endDate) : new Date()
  });

  useEffect(() => {
    if (phase) {
      setDataUpdatePhase({
        name: phase.name || '',
        description: phase.description || '',
        startDate: phase.startDate ? new Date(phase.startDate) : new Date(),
        endDate: phase.endDate ? new Date(phase.endDate) : new Date()
      });
    }
  }, [phase]);

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await updatePhase(phase.id, dataUpdatePhase);
      if (result) {
        toast.success('Updated phase successfull');
        setShowModalUpdate(false);
      } else {
        toast.error('Updated phase unsuccessfull');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setShowModalUpdate(false);
  };

  return (
    <>
      {showModalUpdate && (
        <div
          id="deleteModal"
          tabIndex={-1}
          aria-hidden={!showModalUpdate}
          className="h-modal fixed left-0 right-0 top-0 z-50 flex w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0 md:h-full"
        >
          <div className="relative top-4 max-h-[600px] w-2/3 overflow-y-auto p-6 md:h-auto">
            <div className="relative rounded-lg bg-white p-4 text-left shadow sm:p-5 dark:bg-gray-800">
              <button
                type="button"
                onClick={handleCancel}
                className="absolute right-2.5 top-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <div className="mb-8 mt-6">
                <span className="mb- text-2xl font-bold">
                  You are updating phase for{' '}
                  <span className="text-red-500">{phase.name}</span>
                </span>
                <br />
              </div>

              <div className="mb-4 rounded border border-gray-300 bg-gray-100 p-4 text-left dark:border-gray-600 dark:bg-gray-700">
                <form>
                  <div className="mb-6 grid gap-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="Enter name"
                        value={dataUpdatePhase.name || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setDataUpdatePhase({
                            ...dataUpdatePhase,
                            name: e.target.value
                          })
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="description"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        id="description"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="Enter description"
                        value={dataUpdatePhase.description || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setDataUpdatePhase({
                            ...dataUpdatePhase,
                            description: e.target.value
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        Start date
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        value={
                          dataUpdatePhase.startDate.toISOString().split('T')[0]
                        }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setDataUpdatePhase({
                            ...dataUpdatePhase,
                            startDate: new Date(e.target.value)
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        End date
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        value={
                          dataUpdatePhase.endDate.toISOString().split('T')[0]
                        }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setDataUpdatePhase({
                            ...dataUpdatePhase,
                            endDate: new Date(e.target.value)
                          })
                        }
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="flex items-center justify-end space-x-4">
                <button
                  onClick={handleCancel}
                  className="focus:ring-primary-300 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                  onClick={handleUpdateSubmit}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
