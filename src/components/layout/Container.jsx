import React from 'react';


const Container = (props) => <div style={{
    display: 'flex',
    flexDirection: 'column',
    minHeight: '85.5vh',
}}>
    { props.children }
</div>


export default Container;
