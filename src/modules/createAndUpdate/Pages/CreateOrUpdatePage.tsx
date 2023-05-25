import React, { useState } from 'react'
import { Tabs, Tab } from '@mui/material';
import { InputAdornment, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import { Outlet } from 'react-router';
import '../scss/CreateOrUpdatePage.scss'
import { EmployeeInformation } from '../components/EmployeeInformation';
import { ICreateOrUpdate } from '../../../models/CreatOrUpdate';
import { useSelector } from 'react-redux';
import { selectCoU } from '../redux/CreateOrUpdateReducer';


interface Props {
    "data-value"?: boolean
}

export const CreateOrUpdatePage = (props: Props) => {
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const dataCreate: ICreateOrUpdate = useSelector(selectCoU)
    const [validate, setValidate] = useState(false)

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        console.log(newValue);
        setSelectedTab(newValue);
        if (!dataCreate.name) {
            setValidate(true)
        }
        console.log(validate);
    };

    return (
        <div className='CreateOrUpdatePage'>
            <div className="CreateOrUpdate-header">
                <div className="header-left">
                    <Typography variant="h3" style={{ fontSize: 32, fontWeight: '500' }}>
                        Employee Management
                    </Typography>
                </div>
                <div className="header-right">
                    <Button
                        variant="contained"
                        sx={{
                            padding: '8px 22px'
                        }}
                    >
                        Add
                    </Button>
                </div>
            </div>
            <div className="CreateOrUpdate-tab">
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    TabIndicatorProps={{
                        sx: { background: 'none' }
                    }}
                    sx={{
                        marginBottom: '20px',
                        "& button": {
                            color: props["data-value"] ? "rgb(229, 72, 77)" : "#0097ff" ,
                            backgroundColor: props["data-value"] ? "rgb(255,239,239)" : "rgb(237,246,255)" ,
                            minWidth: 180,
                            minHeight: 42,
                            padding: "6px 16px",
                            borderRadius: "6px",
                            textTransform: "capitalize"
                        },
                        "& button.Mui-selected": {
                            color: "#fff",
                            backgroundColor: props["data-value"] ? "rgb(0, 129, 241)" : "rgb(229,72,77)",
                            outline: "none"
                        },

                    }}
                >
                    <Tab label="Employee Information " data-value={true}/>
                    <Tab label="Contract Information" data-value= {true} />
                    <Tab label="Employment Details" />
                    <Tab label="Salary & Wages" />
                    <Tab label="Others" />
                </Tabs>
                {selectedTab === 0 && <EmployeeInformation />} {/* Nội dung của Tab 1 */}

            </div>
        </div>
    )
}