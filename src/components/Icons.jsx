import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Icons = ({ type, active }) => {

  let imageSource;
  let iconStyle = [styles.icon];

  switch (type) {
    case '1':
      imageSource = require('../assets/routes/1.png');
      active && iconStyle.push(styles.active);
      break;
    case '2':
      imageSource = require('../assets/routes/2.png');
      active && iconStyle.push(styles.active);
      break;
    case '3':
      imageSource = require('../assets/routes/3.png');
      active && iconStyle.push(styles.active);
      break;
    case '4':
      imageSource = require('../assets/routes/4.png');
      active && iconStyle.push(styles.active);
      break;
    case '5':
      imageSource = require('../assets/routes/5.png');
      active && iconStyle.push(styles.active);
      break;
    case 'back':
      imageSource = require('../assets/back.png');
      break;
    case 'music':
      imageSource = require('../assets/music.png');
      break;
  }

  return (
    <Image 
      source={imageSource} 
      style={iconStyle} 
    />
  );
};

const styles = StyleSheet.create({

  icon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },

  active: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#f8c13c',
  },

});

export default Icons;
