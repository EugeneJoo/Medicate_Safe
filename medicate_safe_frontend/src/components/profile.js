import React from 'react';

const ProfileIcon = ({ onClick, text }) => {
  return (
    <div className="profile-icon" onClick={onClick} style={{ cursor: 'pointer' }}>
      <h3>{text}</h3>
    </div>
  );
};

export default ProfileIcon;