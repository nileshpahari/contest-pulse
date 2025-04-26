import React from 'react';
import { SiLeetcode, SiCodeforces, SiCodechef } from 'react-icons/si';

interface ContestIconProps {
  site: string;
  size?: number; 
}

export const SiteIcon: React.FC<ContestIconProps> = ({ site, size = 24 }) => {
  let IconComponent;
  let color = '';

  switch (site.toLowerCase()) {
    case 'leetcode':
      IconComponent = SiLeetcode;
      color = '#FFA500'; 
      break;
    case 'codeforces':
      IconComponent = SiCodeforces;
      color = '#1A73E8'; 
      break;
    case 'codechef':
      IconComponent = SiCodechef;
      color = '#6B4F31'; 
      break;
    default:
      IconComponent = SiCodeforces;
      color = '#808080'; 
  }

  return (
    <IconComponent
      className="w-6 h-6"
      style={{ color, fontSize: size }}
    />
  );
};

