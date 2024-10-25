"use client";
import React, { ReactNode, useEffect, useState } from 'react';
import { Select, Option } from "@material-tailwind/react";
import axios from 'axios';

interface ProfileData {
  cv_link: string | undefined;
  github_link: string | undefined;
  position: ReactNode;
  phone: ReactNode;
  social_contact: string | undefined;
  first_name: string;
  last_name: string;
  student_id: string;
  faculty: string;
  major: string;
  year_of_study: string;
  about: string;
  register_date: string;
  status: string;
}

const Profile = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    // ดึงข้อมูลผู้ใช้จาก API โดยระบุ id เป็น 1
    axios.get('http://localhost:8001/profile/2') // ใช้ id = 1
      .then(response => {
        setProfileData(response.data);
        setStatus(response.data.status); // ตั้งค่า status จากฐานข้อมูล
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
      });
  }, []);

  const handleSave = () => {
    // ส่งข้อมูลสถานะกลับไปที่ backend เพื่ออัปเดตข้อมูล
    axios.put('http://localhost:8001/profile/1', { status }) // ใช้ id = 1
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.error('Error updating profile:', error);
      });
  };

  if (!profileData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mx-auto">
      <div className="flex items-center justify-center ">
        <div className="bg-white dark:bg-[#161A1D] shadow-md rounded-lg p-6 w-full max-w-4xl ">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:justify-between mb-6 ">
            {/* Image profile */}
            <div className="flex-[0_0_20%] flex items-center justify-center mb-4 md:mb-0">
              <img
                src="https://your-image-link-here.com"
                alt="Profile Icon"
                className="bg-black dark:bg-white w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-cover rounded-full"
              />
            </div>

            {/* Personal Information */}
            <div className="flex-[0_0_50%] ml-4 flex flex-col dark:text-gray-100">
              <h2 className="text-xl font-semibold">{profileData.first_name} {profileData.last_name}</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Student ID: {profileData.student_id}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Faculty: {profileData.faculty}
              </p>
              <p className="text-gray-600 dark:text-gray-400">Major: {profileData.major}</p>
              <p className="text-gray-600 dark:text-gray-400">Year of study: {profileData.year_of_study}</p>
            </div>
            <div className="flex-[0_0_30%] mt-4 md:mt-0 flex flex-col ml-4">
      <h2 className="text-xl font-semibold">Details</h2>
      <p className="text-gray-600 dark:text-gray-400">
        CV/Resume : <a target="blank" href={profileData.cv_link} className="text-blue-600">Link</a>
      </p>
      <p className="text-gray-600 dark:text-gray-400">
        GitHub: <a target="blank" href={profileData.github_link} className="text-blue-600">Link</a>
      </p>
      <p className="text-gray-600 dark:text-gray-400">Position: {profileData.position}</p>
      <p className="text-gray-600 dark:text-gray-400">Phone: {profileData.phone}</p>
      <p className="text-gray-600 dark:text-gray-400">
        Social Contact : <a target="blank" href={profileData.social_contact} className="text-blue-600">Link</a>
      </p>
    </div>
          </div>

          {/* About Section */}
          <div className="bg-gray-50 dark:bg-[#22272B] dark:text-gray-100 p-4 rounded-md mb-6  h-80 ">
            <h3 className="text-lg font-semibold mb-2">About themself</h3>
            <p className="text-gray-600 dark:text-gray-400 overflow-y-auto scrollbar-hide h-60">
              {profileData.about}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              {/* Dropdown Section */}
              <div className="w-56">
                <Select
                  label="Status"
                  value={status}
                  onChange={(value) => setStatus(value as string)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  <Option value="Approve">Approve</Option>
                  <Option value="Reject">Reject</Option>
                  <Option value="Internship">Internship</Option>
                </Select>
              </div>
              <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Save
              </button>
            </div>

            {/* Register Section */}
            <div>
              <p className="text-gray-600 font-semibold">Register: {profileData.register_date}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;