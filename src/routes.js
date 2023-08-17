import React from "react";

import {Icon} from "@chakra-ui/react";
import {
    MdBarChart,
    MdPerson,
    MdHome,
    MdLock,
    MdOutlineShoppingCart,
    MdPeopleAlt,
    MdOutlineHomeRepairService,
    MdRequestQuote, MdOutlinePayments, MdOutlineCalendarToday,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";

import PersonsList from './views/admin/persons/personsList/index.jsx';
import PersonsAction from './views/admin/persons/personsAction/index.jsx';

import RepairsList from './views/admin/repairs/repairsList/index.jsx';
import RepairsAction from './views/admin/repairs/repairsAction/index.jsx';
import RepairData from './views/admin/repairs/repairData/index.jsx';

import RepairsQuotesList from './views/admin/repairsQuotes/repairsQuotesList/index.jsx';
import RepairsQuotesAction from './views/admin/repairsQuotes/repairsQuotesAction/index.jsx';

import PaymentsList from './views/admin/payments/paymentsList/index.jsx';
import PaymentAction from './views/admin/payments/paymentAction/index.jsx';

import WorklogList from './views/admin/worklog/worklogList/index.jsx';
import WorklogAction from './views/admin/worklog/worklogAction/index.jsx';

import PersonDebts from './views/admin/debts/personDebts/index.jsx';

// Auth Imports
import SignInCentered from "views/auth/signIn";

const routes = [
    {
        name: "Main Dashboard",
        layout: "/admin",
        path: "/dashboard",
        icon: <Icon as={MdHome} width='20px' height='20px' color='inherit'/>,
        component: MainDashboard,
        viewInSidebar: true,
    },
    {
        name: "Persons",
        layout: "/admin",
        path: "/persons-list",
        icon: <Icon as={MdPeopleAlt} width='20px' height='20px' color='inherit'/>,
        component: PersonsList,
        viewInSidebar: true,
    },
    {
        name: "Add Person",
        layout: "/admin",
        path: "/people-add",
        icon: <Icon as={MdPeopleAlt} width='20px' height='20px' color='inherit'/>,
        component: PersonsAction,
        viewInSidebar: false,
    },
    {
        name: "Repairs",
        layout: "/admin",
        path: "/repairs-list",
        icon: <Icon as={MdOutlineHomeRepairService} width='20px' height='20px' color='inherit'/>,
        component: RepairsList,
        viewInSidebar: true,
    },
    {
        name: "Repairs",
        layout: "/admin",
        path: "/repairs-action",
        icon: <Icon as={MdOutlineHomeRepairService} width='20px' height='20px' color='inherit'/>,
        component: RepairsAction,
        viewInSidebar: false,
    },
    {
        name: "Repairs",
        layout: "/admin",
        path: "/repair-data",
        icon: <Icon as={MdOutlineHomeRepairService} width='20px' height='20px' color='inherit'/>,
        component: RepairData,
        viewInSidebar: false,
    },
    // {
    //     name: "Repairs Quotes",
    //     layout: "/admin",
    //     path: "/repairs-quotes-list",
    //     icon: <Icon as={MdRequestQuote} width='20px' height='20px' color='inherit'/>,
    //     component: RepairsQuotesList,
    //     viewInSidebar: true,
    // },
    {
        name: "Repairs Quotes",
        layout: "/admin",
        path: "/repairs-quotes-action",
        icon: <Icon as={MdOutlineHomeRepairService} width='20px' height='20px' color='inherit'/>,
        component: RepairsQuotesAction,
        viewInSidebar: false,
    },
    {
        name: "Payments",
        layout: "/admin",
        path: "/payments-list",
        icon: <Icon as={MdOutlinePayments} width='20px' height='20px' color='inherit'/>,
        component: PaymentsList,
        viewInSidebar: true,
    },
    {
        name: "Payment Action",
        layout: "/admin",
        path: "/payments-action",
        icon: <Icon as={MdOutlinePayments} width='20px' height='20px' color='inherit'/>,
        component: PaymentAction,
        viewInSidebar: false,
    },
    {
        name: "Worklog",
        layout: "/admin",
        path: "/worklog-list",
        icon: <Icon as={MdOutlineCalendarToday} width='20px' height='20px' color='inherit'/>,
        component: WorklogList,
        viewInSidebar: true,
    },
    {
        name: "Worklog Action",
        layout: "/admin",
        path: "/worklog-action",
        icon: <Icon as={MdOutlineCalendarToday} width='20px' height='20px' color='inherit'/>,
        component: WorklogAction,
        viewInSidebar: false,
    },
    {
        name: "Person Debts",
        layout: "/admin",
        path: "/person-debts",
        icon: <Icon as={MdOutlineCalendarToday} width='20px' height='20px' color='inherit'/>,
        component: PersonDebts,
        viewInSidebar: false,
    },
    // {
    //     name: "NFT Marketplace",
    //     layout: "/admin",
    //     path: "/nft-marketplace",
    //     icon: (
    //         <Icon
    //             as={MdOutlineShoppingCart}
    //             width='20px'
    //             height='20px'
    //             color='inherit'
    //         />
    //     ),
    //     component: NFTMarketplace,
    //     secondary: true,
    //     viewInSidebar: true,
    // },
    // {
    //     name: "Data Tables",
    //     layout: "/admin",
    //     icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit'/>,
    //     path: "/data-tables",
    //     component: DataTables,
    //     viewInSidebar: true,
    // },
    // {
    //     name: "Profile",
    //     layout: "/admin",
    //     path: "/profile",
    //     icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit'/>,
    //     component: Profile,
    //     viewInSidebar: true,
    // },
    // {
    //     name: "Sign In",
    //     layout: "/auth",
    //     path: "/sign-in",
    //     icon: <Icon as={MdLock} width='20px' height='20px' color='inherit'/>,
    //     component: SignInCentered,
    //     viewInSidebar: true,
    // },
    // {
    //     name: "RTL Admin",
    //     layout: "/rtl",
    //     path: "/rtl-default",
    //     icon: <Icon as={MdHome} width='20px' height='20px' color='inherit'/>,
    //     component: RTL,
    //     viewInSidebar: true,
    // },
];

export default routes;
