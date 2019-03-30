import React from 'react';
import Navigation from '../Navigation';
import { Sidemenu } from '@ambrosus/react';
import './Header.scss';

export default function () {
    return (
        <div className='header'>
            <Sidemenu>
                <Navigation />
            </Sidemenu>
        </div>
    );
}
