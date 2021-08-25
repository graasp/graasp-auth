import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param className this property should contain 'fill' to define a color to the logo
 * */
// eslint-disable-next-line arrow-body-style
const GraaspLogo = ({ height, className }) => {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 240 320'
        height={height}
      >
        <path
          className={className}
          d='M109.973 319.13c-24.594 0-50.94-9.516-70.477-25.454-17-13.868-37.264-39.33-37.264-81.882 0-33.163 12.805-76.867 34.252-116.91C46.092 76.95 56.504 61.58 66.59 50.44c11.092-12.245 20.89-18.454 29.127-18.454 3.73 0 6.95 1.264 9.315 3.654 1.49 1.506 2.595 3.438 3.207 5.52 14.377-18.59 31.075-35.293 44.66-35.293 11.23 0 15.404 8.71 15.614 16.428C179.714 10.012 191.36.87 201.212.87c12.41 0 18.064 8.55 18.064 16.492 0 4.938-1.018 8.44-2.955 11.72 1.62-.325 3.24-.443 4.94-.443 9.41 0 16.507 7.298 16.507 16.977 0 8.797-5.07 15.96-13.47 27.83-11.174 15.792-28.06 39.654-46.698 86.456-2.772 6.958-9.55 8.673-14.966 7.958-25.41-3.358-50.55 3.38-67.25 18.022-10.4 9.117-16.128 20.438-16.128 31.875 0 28.388 24.036 38.46 44.62 38.46 22.2 0 38.272-11.072 38.272-18.536 0-2.065-.395-3.437-1.173-4.075-2.057-1.687-8.326-.436-14.39.774-11.09 2.21-24.892 4.962-37.288-2.088-5.433-3.09-8.866-7.28-10.205-12.46-1.73-6.692.712-12.844 1.704-14.47 3.957-6.48 6.966-6.91 11.548-7.074 1.908-.07 4.07-.146 7.12-.883 2.335-.564 6.558-1.92 11.903-3.636 16.553-5.313 44.258-14.206 62.255-14.206 20.264 0 30.865 21.83 30.865 43.396 0 14.45-6.46 38.683-24.663 59.423-14.71 16.763-42.242 36.746-89.85 36.746zM95.717 37.985c-26.746 0-87.484 101.002-87.484 173.808 0 40.196 19.063 64.187 35.057 77.233 18.5 15.092 43.428 24.102 66.684 24.102 45.364 0 71.45-18.872 85.344-34.703 17.104-19.487 23.173-42.06 23.173-55.466 0-18.583-8.54-37.395-24.864-37.395-17.058 0-44.203 8.713-60.422 13.918-5.463 1.754-9.777 3.14-12.33 3.755-3.636.878-6.338.976-8.31 1.047-3.45.124-4.167.15-6.643 4.203-.02.036-2.395 4.703-.99 9.947.94 3.5 3.407 6.407 7.337 8.643 10.45 5.944 23.035 3.434 33.147 1.418 8.447-1.685 15.12-3.017 19.368.47 2.267 1.86 3.368 4.71 3.368 8.716 0 11.582-18.934 24.536-44.272 24.536-25.196 0-50.62-13.747-50.62-44.46 0-13.19 6.454-26.114 18.174-36.388 17.982-15.763 44.9-23.033 71.99-19.458 1.974.263 6.772.373 8.604-4.23 18.9-47.464 36.036-71.678 47.375-87.7 7.713-10.898 12.368-17.477 12.368-24.365 0-6.258-4.518-10.978-10.508-10.978-5.29 0-9.928 1.007-21.394 13.984-10.803 13.096-26.82 35.804-48.843 81.285-.722 1.49-2.513 2.115-4.008 1.392-1.49-.722-2.114-2.517-1.393-4.008 22.182-45.812 38.43-68.902 49.442-82.282.048-.064.1-.128.154-.19l.036-.04c3.48-4.215 6.428-7.455 8.873-10.142 6.657-7.314 9.148-10.052 9.148-17.277 0-4.84-3.16-10.49-12.064-10.49-26.655 0-81.597 93.68-89.568 119.718-.484 1.585-2.167 2.476-3.746 1.99-1.585-.483-2.476-2.16-1.99-3.745 3.955-12.922 19.456-43.13 38.55-71.317 3.186-4.704 6.632-9.585 10.246-14.394 5.317-7.493 7.82-12.703 7.82-16.21 0-3.32-.938-11.046-9.622-11.046-10.998 0-28.562 16.232-48.597 44.772-.39.58-.802 1.17-1.23 1.77l-.042.055c-.774 1.12-1.554 2.257-2.337 3.413-18.425 27.206-33.91 57.367-37.69 69.71-.486 1.584-2.163 2.476-3.748 1.99-1.584-.486-2.475-2.164-1.99-3.748 3.908-12.756 19.724-43.65 38.46-71.316 1.158-1.71 2.35-3.44 3.572-5.184 2.434-3.624 3.46-6.12 3.485-8.367.017-1.464-.505-3.573-2.018-5.103-1.227-1.244-2.926-1.874-5.047-1.874z'
        />  
      </svg>
    )
};

GraaspLogo.defaultProps = {
  className: ''
};

GraaspLogo.propTypes = {
    height: PropTypes.number.isRequired,
    className: PropTypes.string,
};

export default GraaspLogo;