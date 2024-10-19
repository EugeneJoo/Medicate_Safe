import React from 'react';

const ProfileIcon = ({ imageUrl, altText, onClick }) => {
  return (
    <div className="profile-icon" onClick={onClick} style={{ cursor: 'pointer' }}>
      <img src={imageUrl} alt={altText} />
    </div>
  );
};

export default ProfileIcon;