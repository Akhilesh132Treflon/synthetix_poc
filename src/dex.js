import React from 'react';
import './india-logo.css';

const IndiaLogo = () => {
	return (
        <div className="india-logo">
		<h1 >
			<span>
				<img
					style={{
						width: 'inherit',
						borderRadius: '50%',
					}}
					className="ts"
					src="https://clutchco-static.s3.amazonaws.com/s3fs-public/logos/4de897b2db24eb90bd119fac1ce633f2.png?VersionId=EOo.92KvPgv7kU.oYW3R0IgELJrjpJrY"
					alt=""
				/>
			</span>

			<span className="center">I</span>
			<span className="center">N</span>
			<span className="center">D</span>
            <span className="center">I</span>
            <span className="center">A</span>
		
		</h1>
        </div>  
	);
};

export default IndiaLogo;