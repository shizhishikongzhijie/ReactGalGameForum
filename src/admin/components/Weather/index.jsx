import React, { useCallback, useEffect, useState} from 'react';
import { Row, Col } from 'antd';
import styles from './index.cjs';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCloud, faRainbow, faSnowplow, faSun} from '@fortawesome/free-solid-svg-icons'
const Weather = (props) => {
  const [weatherInfo, setWeatherInfo] = useState({});
  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://restapi.amap.com/v3/weather/weatherInfo',
        {
          params: {
            key: '3629a7e5051d3d798b832e508ac166d9',
            city: '640105',
            extensions:'base'
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data.lives[0]);
        setWeatherInfo(response.data.lives[0]);
      } else {
        console.error('Error fetching weather data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error.message || error);
    }
  };
const weatherIcon = () => {
  switch (weatherInfo.weather) {
    case '晴':
      return (<FontAwesomeIcon icon={faSun} style={{height: '50%'}} />);
    case '阴':
      return (<FontAwesomeIcon icon={faCloud} style={{height: '50%'}} />);
    case '雨':
      return (<FontAwesomeIcon icon={faRainbow} style={{height: '50%'}} />);
    case '雪':
      return (<FontAwesomeIcon icon={faSnowplow} style={{height: '50%'}} />);
    default:
      return (<FontAwesomeIcon icon={faCloud} style={{height: '50%'}} />);
  }
};

  useEffect(() => {
    fetchData();
    // 移除不必要的日志打印，因为在初始状态下 weatherInfo 为空
    // console.log("weatherInfo:"+weatherInfo.data.lives[0])
  }, []);

  useCallback(() => {
    fetchData();
    console.log(weatherInfo)
  }, [weatherInfo]);
  return (
    <div className={styles.card}>
      <div className={styles.citySelected}>
        <Row gutter={0} className={'table-list'}>
          <Col span={14}>
            <div className='info'>
              <div className='city'>
                <span>城市:</span> {weatherInfo.city}
              </div>
              <div className='night'>{weatherInfo.reporttime}</div>
              <div className='temperature'>{weatherInfo.temperature}°</div>
            </div>
          </Col>
          <Col span={10}>
            <div className='icon'>
              {weatherIcon(weatherInfo.weather)}
            </div>
          </Col>
        </Row>
      </div>
      <table className={`${styles.table} ${styles.tableStriped}`}>
        <tbody>
          <tr>
            <td>天气</td>
            <td className='font-medium'>{weatherInfo.weather}</td>
          </tr>
          <tr>
            <td>风向</td>
            <td className='font-medium'>{weatherInfo.winddirection}</td>
          </tr>
          <tr>
            <td>风力</td>
            <td className='font-medium'>{weatherInfo.windpower}</td>
          </tr>
          <tr>
            <td>湿度</td>
            <td className='font-medium'>{weatherInfo.humidity + '%'}</td>
          </tr>
        </tbody>
      </table>
      {/* <div className={styles.weekWeather}>
        <Carousel autoplay dots={false} className={styles.weekWeather}>
          <ul className='days-list'>
            <li className='day'>
              <p>Monday</p>
              <SvgIcon iconClass='cloudy' className='panel-icon' />
            </li>
            <li className='day'>
              <p>Tuesday</p>
              <SvgIcon iconClass='overcast' className='panel-icon' />
            </li>
            <li className='day'>
              <p>Wednesday</p>
              <SvgIcon iconClass='sun' className='panel-icon' />
            </li>
          </ul>
          <ul className='days-list'>
            <li className='day'>
              <p>Thursday</p>
              <SvgIcon iconClass='wind' className='panel-icon' />
            </li>
            <li className='day'>
              <p>Friday</p>
              <SvgIcon iconClass='overcast' className='panel-icon' />
            </li>
            <li className='day'>
              <p>Saturday</p>
              <SvgIcon iconClass='rain' className='panel-icon' />
            </li>
          </ul>
        </Carousel>
      </div> */}
    </div>
  );
}

export default Weather;