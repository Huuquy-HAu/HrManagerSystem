import React from 'react'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ListItemAvatar } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Avatar from '@mui/material/Avatar';
import '../scss/SideBar.scss'
import { useLocation, useNavigate } from 'react-router';
import AttendanceManagerIcon from '../../../scss/AttendanceManagementIcon.svg'
import EmployeeManagerIcon from '../../../scss/EmployeeManagementIcon.svg'
import LeaveManagerIcon from '../../../scss/LeaveManagementIcon.svg'
import PayrollManagerIcon from '../../../scss/iconEmployee.svg'
import UserManagerIcon from '../../../scss/UserManagementIcon.svg'
import ListItemIcon from '@mui/material/ListItemIcon';


interface Props {

}

const SideBar = (props: Props) => {
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const nav = useNavigate()
    const location = useLocation()
    



    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        console.log(location);
        setSelectedIndex(index);
        if (index === 3) {
            nav('/employee')
        }else{
            nav('/')
        }
    };
    return (
        <div className='SideBar'>
            <div className="subheader-sidebar">
                <p>General</p>
            </div>
            <List
                sx={{ width: '100%', bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <ListItemButton
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)}
                >
                    <ListItemIcon>
                        <img src={AttendanceManagerIcon} />
                    </ListItemIcon>
                    <ListItemText primary="Attendance Management" />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}
                >
                    <ListItemIcon>
                        <img src={LeaveManagerIcon} />
                    </ListItemIcon>
                    <ListItemText primary="Leave Management" />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                >
                    <ListItemIcon>
                        <img src={PayrollManagerIcon} alt="" className="rounded-full bg-selectedIcon p-2 shadow-selected" />
                    </ListItemIcon>
                    <ListItemText primary="Payroll Management" />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 3}
                    onClick={(event) => handleListItemClick(event, 3)}
                >
                    <ListItemIcon>
                        <img src={EmployeeManagerIcon} />
                    </ListItemIcon>
                    <ListItemText primary="Employee Management" />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 4}
                    onClick={(event) => handleListItemClick(event, 4)}
                >
                    <ListItemIcon>
                        <img src={UserManagerIcon} />
                    </ListItemIcon>
                    <ListItemText primary="User Management" />
                </ListItemButton>
            </List>

            <div className="subheader-sidebar1">
                <p>Advance</p>
            </div>
            <List
                sx={{ width: '100%', bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <ListItemButton
                    selected={selectedIndex === 5}
                    onClick={(event) => handleListItemClick(event, 0)}
                >
                    <ListItemIcon>
                        <img src={AttendanceManagerIcon} />
                    </ListItemIcon>
                    <ListItemText primary="Global Setting" />
                </ListItemButton>

            </List>
        </div>
    )
}

export default SideBar