import { Fragment, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { API_ENDPOINT } from "../../config/constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Transition, Dialog } from "@headlessui/react";

type Inputs = {
  current_password: string;
  new_password: string;
};

const PasswordForm = () => {
  const [error] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const navigate = useNavigate();

  function closeModal() {
    setIsOpen(false);
    navigate("../");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { current_password, new_password } = data;
    const token = localStorage.getItem("authToken") ?? "";
    try {
      const response = await fetch(`${API_ENDPOINT}/user/password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ current_password, new_password }),
      });

      if (!response.ok) {
        throw new Error("password change failed");
      }

      const responseData = await response.json();
      console.log(responseData.status);
      toast.success("Password changed successfully!", {
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Password change failed:", error);
      toast.error("Password change failed. Please try again.", {
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto">
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-96 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Change Password
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div>
                        {error && <span className="text-red-500">{error}</span>}
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="current_password"
                        >
                          Old Password:
                        </label>
                        <input
                          id="current_password"
                          type="password"
                          placeholder="Enter Old Password..."
                          autoFocus
                          {...register("current_password", { required: true })}
                          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                        />
                        {errors.current_password && (
                          <p className="text-red-500 text-xs italic">
                            Old password is required.
                          </p>
                        )}
                      </div>
                      <div className="mb-6">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="new_password"
                        >
                          New Password:
                        </label>
                        <input
                          id="new_password"
                          type="password"
                          placeholder="Enter New Password..."
                          {...register("new_password", { required: true })}
                          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                        />
                        {errors.new_password && (
                          <p className="text-red-500 text-xs italic">
                            New password is required.
                          </p>
                        )}
                      </div>
                      <div className="mt-6 flex justify-around">
                        <button
                          type="submit"
                          className="w-32 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
                        >
                          Change
                        </button>
                        <button
                          type="button"
                          className=" w-32 inline-flex justify-center px-6 py-3 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                          onClick={closeModal}
                        >
                          Close
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Change Password
          </h2>
        </div>
        <div>{error && <span className="text-red-500">{error}</span>}</div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="current_password"
          >
            Old Password:
          </label>
          <input
            id="current_password"
            type="password"
            placeholder="Enter Old Password..."
            autoFocus
            {...register("current_password", { required: true })}
            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          />
          {errors.current_password && (
            <p className="text-red-500 text-xs italic">
              Old password is required.
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="new_password"
          >
            New Password:
          </label>
          <input
            id="new_password"
            type="password"
            placeholder="Enter New Password..."
            {...register("new_password", { required: true })}
            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          />
          {errors.new_password && (
            <p className="text-red-500 text-xs italic">
              New password is required.
            </p>
          )}
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
          >
            Change Password
          </button>
        </div>
      </form> */}
    </div>
  );
};

export default PasswordForm;
