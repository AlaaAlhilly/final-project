import React from 'react';

export default () => {
	return (
		<footer
			className=" footer bg-dark text-white text-center mb-0 mt-5 fixed-bottom"
			style={{
				left: 0,
				bottom: 0,
				backgroundColor: 'red',
				color: 'white',
				textAlign: 'center',
				width: '100%',
				height: '50px',
				overflow: 'x-axis'
			}}
		>
			<div className="container-fluid text-center">
				<div className="row">
					<div className="col-md-12 mt-3">DevConnector &copy; 2019 </div>
				</div>
			</div>
		</footer>
	);
};
