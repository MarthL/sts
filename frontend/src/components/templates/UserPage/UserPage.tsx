import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { User, exportProfilePicture, getUserById } from './../../../api/users';
import { useNavigate } from 'react-router-dom';
import { CircleChart } from '@/components/organisms/CircleChart/CircleChart';
import { Masonry } from "@/components/organisms/Masonry/Masonry";
import { Avatar } from "@mui/material";
import { InputProfileCustom } from "@/components/atoms/InputForm/InputProfileCustom";
import { TextField } from "@mui/material";
import { LineChartInt } from "@/components/organisms/LineChartInt/LineChartInt";
import { ProfileMainInfos } from "@/components/organisms/Profile/ProfileMainInfos";

export const UserPage: React.FC<any> = () => {

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User>();
  const [profilePicture, setProfilePicture] = useState(user?.profile_picture);
  const [avatarFile, setAvatarFile] = useState<any>('');

  useEffect(() => {
    const fetchUser = async () => {
      if (id !== undefined && localStorage.getItem('id') !== id) {
        const res = await getUserById(parseInt(id));
        setUser(res);
        setProfilePicture(res.profile_picture || '');
      } else {
        navigate('/profile');
      }
    };

    fetchUser();
  }, [id, navigate]);

  useEffect(() => {
    if (profilePicture) {
      exportProfilePicture(profilePicture)
        .then((url) => {
          setAvatarFile(url);
        });
    }
  }, [profilePicture]);

  return (
    <>
      <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4">
        <div className="mb-4 col-span-full xl:mb-2">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">User settings</h1>
        </div>
        <div className="col-span-full xl:col-auto">
          <ProfileMainInfos user={user as User} />
          <div className="p-4 mb-4 bg-dark border border-gray-800 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <CircleChart />
          </div>
          <div className="p-4 mb-4 bg-dark border border-gray-800 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div className="flow-root">
              <h3 className="text-xl font-semibold dark:text-white">Social accounts</h3>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 dark:text-white" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-base font-semibold text-gray-900 truncate dark:text-white">
                        Facebook account
                      </span>
                      <a href="#" className="block text-sm font-normal truncate text-primary-700 hover:underline dark:text-primary-500">
                        www.facebook.com/themesberg
                      </a>
                    </div>
                    <div className="inline-flex items-center">
                      <a href="#" className="px-3 py-2 mb-3 mr-3 text-sm font-medium text-center text-gray-900 bg-dark border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Disconnect</a>
                    </div>
                  </div>
                </li>
                <li className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 dark:text-white" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-base font-semibold text-gray-900 truncate dark:text-white">
                        Twitter account
                      </span>
                      <a href="#" className="block text-sm font-normal truncate text-primary-700 hover:underline dark:text-primary-500">
                        www.twitter.com/themesberg
                      </a>
                    </div>
                    <div className="inline-flex items-center">
                      <a href="#" className="px-3 py-2 mb-3 mr-3 text-sm font-medium text-center text-gray-900 bg-dark border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Disconnect</a>
                    </div>
                  </div>
                </li>
                <li className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 dark:text-white" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-base font-semibold text-gray-900 truncate dark:text-white">
                        Github account
                      </span>
                      <span className="block text-sm font-normal text-gray-500 truncate dark:text-gray-400">
                        Not connected
                      </span>
                    </div>
                    <div className="inline-flex items-center">
                      <a href="#" className="px-3 py-2 mb-3 mr-3 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Connect</a>
                    </div>
                  </div>
                </li>
                <li className="pt-4 pb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 dark:text-white" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="dribbble" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.252 8 8 119.252 8 256s111.252 248 248 248 248-111.252 248-248S392.748 8 256 8zm163.97 114.366c29.503 36.046 47.369 81.957 47.835 131.955-6.984-1.477-77.018-15.682-147.502-6.818-5.752-14.041-11.181-26.393-18.617-41.614 78.321-31.977 113.818-77.482 118.284-83.523zM396.421 97.87c-3.81 5.427-35.697 48.286-111.021 76.519-34.712-63.776-73.185-116.168-79.04-124.008 67.176-16.193 137.966 1.27 190.061 47.489zm-230.48-33.25c5.585 7.659 43.438 60.116 78.537 122.509-99.087 26.313-186.36 25.934-195.834 25.809C62.38 147.205 106.678 92.573 165.941 64.62zM44.17 256.323c0-2.166.043-4.322.108-6.473 9.268.19 111.92 1.513 217.706-30.146 6.064 11.868 11.857 23.915 17.174 35.949-76.599 21.575-146.194 83.527-180.531 142.306C64.794 360.405 44.17 310.73 44.17 256.323zm81.807 167.113c22.127-45.233 82.178-103.622 167.579-132.756 29.74 77.283 42.039 142.053 45.189 160.638-68.112 29.013-150.015 21.053-212.768-27.882zm248.38 8.489c-2.171-12.886-13.446-74.897-41.152-151.033 66.38-10.626 124.7 6.768 131.947 9.055-9.442 58.941-43.273 109.844-90.795 141.978z"></path></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-base font-semibold text-gray-900 truncate dark:text-white">
                        Dribbble account
                      </span>
                      <span className="block text-sm font-normal text-gray-500 truncate dark:text-gray-400">
                        Not connected
                      </span>
                    </div>
                    <div className="inline-flex items-center">
                      <a href="#" className="px-3 py-2 mb-3 mr-3 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Connect</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div>
                <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save all</button>
              </div>
            </div>
          </div>
          <div className="p-4 mb-4 bg-dark border border-gray-800 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div className="flow-root">
              <h3 className="text-xl font-semibold dark:text-white">Other accounts</h3>
              <ul className="mb-6 divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-4">
                  <div className="flex justify-between xl:block 2xl:flex align-center 2xl:space-x-4">
                    <div className="flex space-x-4 xl:mb-4 2xl:mb-0">
                      <div>
                        <img className="w-6 h-6 rounded-full" src="/images/users/bonnie-green.png" alt="Bonnie image" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-semibold text-gray-900 leading-none truncate mb-0.5 dark:text-white">
                          Bonnie Green
                        </p>
                        <p className="mb-1 text-sm font-normal truncate text-primary-700 dark:text-primary-500">
                          New York, USA
                        </p>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          Last seen: 1 min ago
                        </p>
                      </div>
                    </div>
                    <div className="inline-flex items-center w-auto xl:w-full 2xl:w-auto">
                      <a href="#" className="w-full px-3 py-2 text-sm font-medium text-center text-gray-900 bg-dark border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Disconnect</a>
                    </div>
                  </div>
                </li>
                <li className="py-4">
                  <div className="flex justify-between xl:block 2xl:flex align-center 2xl:space-x-4">
                    <div className="flex space-x-4 xl:mb-4 2xl:mb-0">
                      <div>
                        <img className="w-6 h-6 rounded-full" src="/images/users/jese-leos.png" alt="Jese image" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-semibold text-gray-900 leading-none truncate mb-0.5 dark:text-white">
                          Jese Leos
                        </p>
                        <p className="mb-1 text-sm font-normal truncate text-primary-700 dark:text-primary-500">
                          California, USA
                        </p>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          Last seen: 2 min ago
                        </p>
                      </div>
                    </div>
                    <div className="inline-flex items-center w-auto xl:w-full 2xl:w-auto">
                      <a href="#" className="w-full px-3 py-2 text-sm font-medium text-center text-gray-900 bg-dark border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Disconnect</a>
                    </div>
                  </div>
                </li>
                <li className="py-4">
                  <div className="flex justify-between xl:block 2xl:flex align-center 2xl:space-x-4">
                    <div className="flex space-x-4 xl:mb-4 2xl:mb-0">
                      <div>
                        <img className="w-6 h-6 rounded-full" src="/images/users/thomas-lean.png" alt="Thomas image" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-semibold text-gray-900 leading-none truncate mb-0.5 dark:text-white">
                          Thomas Lean
                        </p>
                        <p className="mb-1 text-sm font-normal truncate text-primary-700 dark:text-primary-500">
                          Texas, USA
                        </p>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          Last seen: 1 hour ago
                        </p>
                      </div>
                    </div>
                    <div className="inline-flex items-center w-auto xl:w-full 2xl:w-auto">
                      <a href="#" className="w-full px-3 py-2 text-sm font-medium text-center text-gray-900 bg-dark border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Disconnect</a>
                    </div>
                  </div>
                </li>
                <li className="pt-4">
                  <div className="flex justify-between xl:block 2xl:flex align-center 2xl:space-x-4">
                    <div className="flex space-x-4 xl:mb-4 2xl:mb-0">
                      <div>
                        <img className="w-6 h-6 rounded-full" src="/images/users/lana-byrd.png" alt="Lana image" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-semibold text-gray-900 leading-none truncate mb-0.5 dark:text-white">
                          Lana Byrd
                        </p>
                        <p className="mb-1 text-sm font-normal truncate text-primary-700 dark:text-primary-500">
                          Texas, USA
                        </p>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          Last seen: 1 hour ago
                        </p>
                      </div>
                    </div>
                    <div className="inline-flex items-center w-auto xl:w-full 2xl:w-auto">
                      <a href="#" className="w-full px-3 py-2 text-sm font-medium text-center text-gray-900 bg-dark border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Disconnect</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div>
                <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save all</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="p-4 mb-4 bg-dark border border-gray-800 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold dark:text-white">General information</h3>
            <form action="#" className="mb-5">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <TextField
                    label={"Name"}
                    value={user?.username ?? ""}
                    fullWidth
                    disabled
                    sx={{ margin: 'auto' }}
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <TextField
                    label={"Family Name"}
                    value={user?.family_name ?? ""}
                    fullWidth
                    disabled
                    sx={{ margin: 'auto' }}
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <TextField
                    label={"Country"}
                    value={user?.country ? user?.country : "France"}
                    fullWidth
                    disabled
                    sx={{ margin: 'auto' }}
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <TextField
                    label={"Citys"}
                    value={user?.city?.city_name ?? ""}
                    fullWidth
                    disabled
                    sx={{ margin: 'auto' }}
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <TextField
                    label={"Phone"}
                    value={user?.phone_number ?? ""}
                    fullWidth
                    disabled
                    sx={{ margin: 'auto' }}
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <TextField
                    label={"Email"}
                    value={user?.email ?? ""}
                    fullWidth
                    disabled
                    sx={{ margin: 'auto' }}
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
              </div>
            </form>
            <LineChartInt />
          </div>
          <div className="p-4 mb-4 bg-dark border border-gray-800 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div className="flow-root">
              <h3 className="text-xl font-semibold dark:text-white">Sessions</h3>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-semibold text-gray-900 truncate dark:text-white">
                        California 123.123.123.123
                      </p>
                      <p className="text-sm font-normal text-gray-500 truncate dark:text-gray-400">
                        Chrome on macOS
                      </p>
                    </div>
                    <div className="inline-flex items-center">
                      <a href="#" className="px-3 py-2 mb-3 mr-3 text-sm font-medium text-center text-gray-900 bg-dark border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Revoke</a>
                    </div>
                  </div>
                </li>
                <li className="pt-4 pb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-semibold text-gray-900 truncate dark:text-white">
                        Rome 24.456.355.98
                      </p>
                      <p className="text-sm font-normal text-gray-500 truncate dark:text-gray-400">
                        Safari on iPhone
                      </p>
                    </div>
                    <div className="inline-flex items-center">
                      <a href="#" className="px-3 py-2 mb-3 mr-3 text-sm font-medium text-center text-gray-900 bg-dark border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Revoke</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div>
                <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">See more</button>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="grid grid-cols-1 px-4 xl:grid-cols-2 xl:gap-4">
        <div className="p-4 mb-4 bg-dark border border-gray-800 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800 xl:mb-0">
          <div className="flow-root">
            <h3 className="text-xl font-semibold dark:text-white">Alerts & Notifications</h3>
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">You can set up Themesberg to get notifications</p>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <div className="flex items-center justify-between py-4">
                <div className="flex flex-col flex-grow">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">Company News</div>
                  <div className="text-base font-normal text-gray-500 dark:text-gray-400">Get Themesberg news, announcements, and product updates</div>
                </div>
                <label htmlFor="company-news" className="relative flex items-center cursor-pointer">
                  <input type="checkbox" id="company-news" className="sr-only" />
                  <span className="h-6 bg-gray-200 border border-gray-800 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
                </label>
              </div>
              <div className="flex items-center justify-between py-4">
                <div className="flex flex-col flex-grow">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">Account Activity</div>
                  <div className="text-base font-normal text-gray-500 dark:text-gray-400">Get important notifications about you or activity you've missed</div>
                </div>
                <label htmlFor="account-activity" className="relative flex items-center cursor-pointer">
                  <input type="checkbox" id="account-activity" className="sr-only" checked />
                  <span className="h-6 bg-gray-200 border border-gray-800 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
                </label>
              </div>
              <div className="flex items-center justify-between py-4">
                <div className="flex flex-col flex-grow">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">Meetups Near You</div>
                  <div className="text-base font-normal text-gray-500 dark:text-gray-400">Get an email when a Dribbble Meetup is posted close to my location</div>
                </div>
                <label htmlFor="meetups" className="relative flex items-center cursor-pointer">
                  <input type="checkbox" id="meetups" className="sr-only" checked />
                  <span className="h-6 bg-gray-200 border border-gray-800 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
                </label>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div className="flex flex-col flex-grow">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">New Messages</div>
                  <div className="text-base font-normal text-gray-500 dark:text-gray-400">Get Themsberg news, announcements, and product updates</div>
                </div>
                <label htmlFor="new-messages" className="relative flex items-center cursor-pointer">
                  <input type="checkbox" id="new-messages" className="sr-only" />
                  <span className="h-6 bg-gray-200 border border-gray-800 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
                </label>
              </div>
            </div>
            <div className="mt-6">
              <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save all</button>
            </div>
          </div>
        </div>
        <div className="p-4 mb-4 bg-dark border border-gray-800 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800 xl:mb-0">
          <div className="flow-root">
            <h3 className="text-xl font-semibold dark:text-white">Email Notifications</h3>
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">You can set up Themesberg to get email notifications </p>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <div className="flex items-center justify-between py-4">
                <div className="flex flex-col flex-grow">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">Rating reminders</div>
                  <div className="text-base font-normal text-gray-500 dark:text-gray-400">Send an email reminding me to rate an item a week after purchase</div>
                </div>
                <label htmlFor="rating-reminders" className="relative flex items-center cursor-pointer">
                  <input type="checkbox" id="rating-reminders" className="sr-only" />
                  <span className="h-6 bg-gray-200 border border-gray-800 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
                </label>
              </div>
              <div className="flex items-center justify-between py-4">
                <div className="flex flex-col flex-grow">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">Item update notifications</div>
                  <div className="text-base font-normal text-gray-500 dark:text-gray-400">Send user and product notifications htmlFor you</div>
                </div>
                <label htmlFor="item-update" className="relative flex items-center cursor-pointer">
                  <input type="checkbox" id="item-update" className="sr-only" checked />
                  <span className="h-6 bg-gray-200 border border-gray-800 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
                </label>
              </div>
              <div className="flex items-center justify-between py-4">
                <div className="flex flex-col flex-grow">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">Item comment notifications</div>
                  <div className="text-base font-normal text-gray-500 dark:text-gray-400">Send me an email when someone comments on one of my items</div>
                </div>
                <label htmlFor="item-comment" className="relative flex items-center cursor-pointer">
                  <input type="checkbox" id="item-comment" className="sr-only" checked />
                  <span className="h-6 bg-gray-200 border border-gray-800 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
                </label>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div className="flex flex-col flex-grow">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">Buyer review notifications</div>
                  <div className="text-base font-normal text-gray-500 dark:text-gray-400">Send me an email when someone leaves a review with their rating</div>
                </div>
                <label htmlFor="buyer-rev" className="relative flex items-center cursor-pointer">
                  <input type="checkbox" id="buyer-rev" className="sr-only" />
                  <span className="h-6 bg-gray-200 border border-gray-800 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
                </label>
              </div>
            </div>
            <div className="mt-6">
              <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save all</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}