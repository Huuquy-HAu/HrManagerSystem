import React from 'react'
import '../scss/Header.scss'
import { Button, Select, Space } from 'antd';
import logo from '../../../scss/Rectangle 4.svg'

interface Props {

}

export const Header = (props: Props) => {

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className='Header'>
      <div className="Header-left">
        <div className="logo">
            <img src={logo} alt="" />
        </div>
        <h2>HR Management System</h2>
      </div>
      <div className="Header-right">
        <div className="change-language">
          <Select
            defaultValue={"EN"}
            style={{ width: 98 }}
            onChange={handleChange}
            options={[
              { value: 'EN', label: '🇬🇧 EN' },
              { value: 'VI', label: '🇻🇳 VI' },
            ]}
          />
        </div>
        <div className="logo-user">
            <Button shape='circle'>
                q
            </Button>
        </div>
      </div>
    </div>
  )
}