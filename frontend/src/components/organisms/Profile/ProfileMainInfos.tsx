import React from "react";
import { Avatar } from "@mui/material";
import { User } from "@/api/users";

type ProfileProps = {
  avatarFile?: string;
  user: User;
};

export const ProfileMainInfos: React.FC<ProfileProps> = ({ avatarFile, user }) => {
  return (
    <div
      className="flex flex-col items-center text-center space-y-3"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <div>
        <Avatar
          sx={{ width: 150, height: 150, cursor: "pointer" }}
          src={avatarFile}
          onClick={() =>
            (document.querySelector('input[id="photo"]') as HTMLInputElement)?.click()
          }
        />
      </div>
      <div>
        <h3 className="text-xl font-bold dark:text-white">
          {user?.username} {user?.family_name}
        </h3>
      </div>
      <div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {user?.job?.job_title}
        </span>
      </div>
    </div>
  );
};