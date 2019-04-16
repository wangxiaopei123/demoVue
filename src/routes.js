// Vue前端

const Login = () => import('./views/Login.vue');//登录页
const Register = () => import('./views/Register.vue');//注册页
const Header = () => import('./views/frame/Header.vue');//登录成功企业实名认证头部
const HeaderCapacity = () => import('./views/frame/HeaderCapacity.vue');//登录成功运力资源认证头部
const Agreement = () => import('./views/Agreement.vue');//协议页
const ForgetPass = () => import('./views/ForgetPass.vue');//忘记密码
const Info_Logistics = () => import('./views/company/Info_Logistics.vue');//物流企业-上传并填写资料
const Info_Other = () => import('./views/company/Info_Other.vue');//非物流企业-上传并填写资料
const CompanyVerifyInfo = () => import('./views/company/VerifyInfo.vue');//企业认证信息——核对并完善信息
const CompanyResult = () => import('./views/company/Result.vue');//企业认证信息——审核结果页
const CompanySuccess = () => import('./views/company/Success.vue');//企业认证信息——审核失败
const CompanyError = () => import('./views/company/Error.vue');//企业认证信息——审核成功


const TypeSelection = () => import('./views/admitWeb/capacity/TypeSelection.vue');//选择物流公司类型
const AddBigCarTransportInfo = () => import('./views/admitWeb/capacity/carTransport/AddBigCarTransportInfo.vue');//轿运物流公司—大板车辆信息
const AddBigCarHead = () => import('./views/admitWeb/capacity/carTransport/AddBigCarHead.vue');//轿运物流公司—大板车辆-车头信息
const AddBatchCarImage = () => import('./views/admitWeb/capacity/carTransport/AddBatchCarImage.vue') //批量上传证件
const AddBigCarTrailer = () => import('./views/admitWeb/capacity/carTransport/AddBigCarTrailer.vue');//轿运物流公司—大板车辆-车头信息
const AddSmallCarTransportInfo = () => import('./views/admitWeb/capacity/carTransport/AddSmallCarTransportInfo.vue');//轿运物流公司——添加小板车辆信息
const AddCarTransportDriverInfo = () => import('./views/admitWeb/capacity/carTransport/AddCarTransportDriverInfo.vue');	//轿运物流公司——添加司机信息
const AddCarTransportLineInfo = () => import('./views/admitWeb/capacity/carTransport/AddCarTransportLineInfo.vue');//轿运物流公司——添加专线信息
const AddWayRescueInfo = () => import('./views/admitWeb/capacity/wayRescue/AddWayRescueInfo.vue');//道路救援公司——添加车辆信息
const AddCarRescueDialog = () => import('./views/admitWeb/capacity/wayRescue/AddCarRescueDialog.vue');//道路救援公司——添加车辆信息弹框
const WayRescueDetailDialog = () => import('./views/admitWeb/capacity/wayRescue/WayRescueDetailDialog.vue');//道路救援公司——车辆信息弹框
const UploadCarRescueImg = () => import('./views/admitWeb/capacity/wayRescue/UploadCarRescueImg.vue');//道路救援公司——上传证件弹框
const AddWayRescueDriverInfo = () => import('./views/admitWeb/capacity/wayRescue/AddWayRescueDriverInfo.vue');//道路救援公司——添加司机信息
const AddWayRescueLineInfo = () => import('./views/admitWeb/capacity/wayRescue/AddWayRescueLineInfo.vue');//道路救援公司——添加专线信息
const SampleGraph = () => import('./views/admitWeb/SampleGraph.vue');




// Vue后台

const Home = () => import('./views/Home.vue');//主页
const Welcome = () => import('./views/welcome/Welcome.vue');//系统欢迎页
const IndexPage = () => import('./views/indexPage/IndexPage.vue');//首页
const Test = () => import('./views/Test.vue');//测试页
const Basic = () => import('./views/accountManage/basic/Basic.vue');//账号管理——基本资料
const Realname = () => import('./views/accountManage/realname/Realname.vue');//账号管理——实名认证
const Realname_Check = () => import('./views/accountManage/realname/Realname_Check.vue');//账号管理——实名认证审核
const Safetyset = () => import('./views/accountManage/safetyset/Safetyset.vue');//账号管理——安全设置

const EditMobile = () => import('./views/accountManage/safetyset/EditMobile.vue');//账号管理——安全设置——修改手机号
const EditMail = () => import('./views/accountManage/safetyset/EditMail.vue');//账号管理——安全设置——修改邮箱
const EditPass = () => import('./views/accountManage/safetyset/EditPass.vue');//账号管理——安全设置——修改密码
const SetMail = () => import('./views/accountManage/safetyset/SetMail.vue');//账号管理——安全设置——设置邮箱
const Clientmanagement = () => import('./views/accountManage/clientmanagement/Clientmanagement.vue');//账号管理——委托人管理
const Clientmanagement_Check = () => import('./views/accountManage/clientmanagement/Clientmanagement_Check.vue');//账号管理——委托人管理——信息审核

const Transportlicence = () => import('./views/accountManage/transportlicence/Transportlicence.vue');//账号管理——道路运输经营许可证
const Transportlicence_Check = () => import('./views/accountManage/transportlicence/Transportlicence_Check.vue');//账号管理——道路运输经营许可证
const MessageManage = () => import('./views/messageManage/MessageManage.vue');//消息管理
const CarManage = () => import('./views/admitManage/carManage/CarManage.vue');//车辆管理
const CarWayManage = () => import('./views/admitManage/carManage/CarWayManage.vue');//车辆管理
const DriverManage = () => import('./views/admitManage/driverManage/DriverManage.vue');//司机管理
const LineManage = () => import('./views/admitManage/lineManage/LineManage');//专线管理
const LineWayManage = () => import('./views/admitManage/lineManage/LineWayManage.vue');//专线管理
const OfficeManage = () => import('./views/admitManage/officeManage/OfficeManage.vue');//办事处管理
const AddOffice = () => import('./views/admitManage/officeManage/AddOffice.vue');//办事处管理添加编辑
const OfficeDetails = () => import('./views/admitManage/officeManage/OfficeDetails.vue');//办事处管理详情
const FinanceInfo = () => import('./views/admitManage/financeInfo/FinanceInfo.vue');//财务信息
const FinanceInfo_Check = () => import('./views/admitManage/financeInfo/FinanceInfo_Check.vue');//财务信息审核
const CargoInsurance = () => import('./views/admitManage/logisticsManage/CargoInsurance.vue');//货运险
const CarrierInsurance = () => import('./views/admitManage/logisticsManage/CarrierInsurance.vue');//货运险
const EmployerInsurance = () => import('./views/admitManage/logisticsManage/EmployerInsurance.vue');//雇主责任险
const UploadCorrection = () => import('./views/admitManage/logisticsManage/UploadCorrection.vue');//雇主责任险-批单

const AddCargoInsurance = () => import('./views/admitManage/logisticsManage/AddCargoInsurance.vue');//新增货运险
const CarInfo = () => import('./views/admitManage/logisticsManage/CarInfo.vue');//车辆信息
const InsuranceDetails = () => import('./views/admitManage/logisticsManage/InsuranceDetails.vue');//保险详情
const EndorsementDetails = () => import('./views/admitManage/logisticsManage/EndorsementDetails.vue');//批单详情
const UploadEndorsement = () => import('./views/admitManage/logisticsManage/UploadEndorsement.vue');//上传/修改批单
const DriverInfo = () => import('./views/admitManage/logisticsManage/DriverInfo.vue');//司机信息

let routes = [

    {
        path: '/login',
        component: Login,
        name: 'Login',
        hidden: true
    }, //登录
    {
        path: '/header',
        component: Header,
        name: 'Header',
        hidden: true
    },
    {
        path: '/headerCapacity',
        component: HeaderCapacity,
        name: 'HeaderCapacity',
        hidden: true
    },
    {
        path: '/test',
        component: Test,
        name: 'Test',
        hidden: true
    }, //测试页
    {
        path: '/agreement',
        component: Agreement,
        name: 'Agreement',
        hidden: true
    }, //协议页
    {
        path: '/register',
        component: Register,
        name: 'Register',
        hidden: true
    }, //注册
    {
        path: '/forgetpass',
        component: ForgetPass,
        name: 'ForgetPass',
        hidden: true
    },//忘记密码
    {
        path: '/company/info_logistics',
        component: Info_Logistics,
        name: 'Info_Logistics',
        hidden: true
    },
    {
        path: '/company/info_other',
        component: Info_Other,
        name: 'Info_Other',
        hidden: true
    },
    {
        path: '/company/verifyInfo',
        component: CompanyVerifyInfo,
        name: 'CompanyVerifyInfo',
        hidden: true
    },
    {
        path: '/company/result',
        component: CompanyResult,
        name: 'CompanyResult',
        hidden: true
    },
    {
        path: '/company/Success',
        component: CompanySuccess,
        name: 'CompanySuccess',
        hidden: true
    },
    {
        path: '/company/error',
        component: CompanyError,
        name: 'CompanyError',
        hidden: true
    },
	{
	    path: '/admitWeb/capacity/typeSelection',
	    component: TypeSelection,
	    name: 'TypeSelection',
	    hidden: true
	},
	{
	    path: '/admitWeb/capacity/carTransport/addBigCarTransportInfo',
	    component: AddBigCarTransportInfo,
	    name: 'AddBigCarTransportInfo',
	    hidden: true
	},{
        path: '/admitWeb/capacity/carTransport/addBigCarHead',
        component: AddBigCarHead,
        name: 'AddBigCarHead',
        hidden: true
    },{
        path: '/admitWeb/capacity/carTransport/AddBatchCarImage',
        component: AddBatchCarImage,
        name: 'AddBatchCarImage',
        hidden: true
    },{
        path: '/admitWeb/SampleGraph',
        component: SampleGraph,
        name: 'SampleGraph',
        hidden: true
    },{
        path: '/admitWeb/capacity/carTransport/addBigCarTrailer',
        component: AddBigCarTrailer,
        name: 'AddBigCarTrailer',
        hidden: true
    },{
        path: '/admitWeb/capacity/carTransport/addSmallCarTransportInfo',
        component: AddSmallCarTransportInfo,
        name: 'AddSmallCarTransportInfo',
        hidden: true
    },
	{
	    path: '/admitWeb/capacity/carTransport/addCarTransportDriverInfo',
	    component: AddCarTransportDriverInfo,
	    name: 'AddCarTransportDriverInfo',
	    hidden: true
	},
	{
	    path: '/admitWeb/capacity/carTransport/addCarTransportLineInfo',
	    component: AddCarTransportLineInfo,
	    name: 'AddCarTransportLineInfo',
	    hidden: true
	},
	{
	    path: '/admitWeb/capacity/wayRescue/addWayRescueInfo',
	    component: AddWayRescueInfo,
	    name: 'AddWayRescueInfo',
	    hidden: true
	},

    {
        path: '/admitWeb/capacity/wayRescue/addCarRescueDialog',
        component: AddCarRescueDialog,
        name: 'AddCarRescueDialog',
        hidden: true
    },
    {
      path :'/admitWeb/capacity/wayRescue/WayRescueDetailDialog' ,
      component: WayRescueDetailDialog,
      name: 'WayRescueDetailDialog'  ,
      hidden: true
    },
    {
        path :'/admitWeb/capacity/wayRescue/UploadCarRescueImg' ,
        component: UploadCarRescueImg,
        name: 'UploadCarRescueImg'  ,
        hidden: true
    },
	{
	    path: '/admitWeb/capacity/wayRescue/addWayRescueDriverInfo',
	    component: AddWayRescueDriverInfo,
	    name: 'AddWayRescueDriverInfo',
	    hidden: true
	},
	{
	    path: '/admitWeb/capacity/wayRescue/addWayRescueLineInfo',
	    component: AddWayRescueLineInfo,
	    name: 'AddWayRescueLineInfo',
	    hidden: true
	},
    {
        path: '/',
        component: Home,
        name: 'Home',
        hidden: true,
        redirect: {path: 'login'},
        children: [
            {
                name: 'Welcome',
                path: 'welcome',
                component: Welcome
            },  //系统欢迎页
            {
                name: 'IndexPage',
                path: 'indexPage',
                component: IndexPage
            },  //首页
            {
                name: 'Basic',
                path: 'basic',
                component: Basic
            },  //基本资料
            {
                name: 'Realname',
                path: 'realname',
                component: Realname
            },  //实名认证
			{
			    path: '/realname_check',
			    component: Realname_Check,
			    name: 'Realname_Check'
			},
            {
                name: 'Safetyset',
                path: 'safetyset',
                component: Safetyset
            },  //安全设置
            {
                path: '/editmail',
                component: EditMail,
                name: 'EditMail',
                hidden: true
            },
            {
                path: '/editmobile',
                component: EditMobile,
                name: 'EditMobile',
                hidden: true
            },
            {
                path: '/editpass',
                component: EditPass,
                name: 'EditPass',
                hidden: true
            },
            {
                path: '/setmail',
                component: SetMail,
                name: 'SetMail',
                hidden: true
            },
            {
                name: 'Clientmanagement',
                path: '/clientmanagement',
                component: Clientmanagement
            },  //委托人管理
            {
                name: 'Clientmanagement_Check',
                path: '/clientmanagement_check',
                component: Clientmanagement_Check
            },
            {
                name: 'Transportlicence',
                path: 'transportlicence',
                component: Transportlicence
            },  //道路运输经营许可证
            {
                name: 'Transportlicence_Check',
                path: '/transportlicence_check',
                component: Transportlicence_Check
            },

            {
                name: 'MessageManage',
                path: 'messageManage',
                component: MessageManage
            },   //消息管理
			{
			    name: 'CarManage',
			    path: '/carManage',
			    component: CarManage
			}, //车辆管理
            {
                name: 'CarWayManage',
                path: '/carWayManage',
                component: CarWayManage
            },
			{
			    name: 'DriverManage',
			    path: '/driverManage',
			    component: DriverManage
			}, //司机管理
			{
			    name: 'LineManage',
			    path: '/lineManage',
			    component: LineManage
                // path: '/lineManage',
                // component: AddCarTransportLineInfo,
                // name: 'AddCarTransportLineInfo'
			}, //专线管理
            {
                name: 'LineWayManage',
                path: '/lineWayManage',
                component: LineWayManage
            },
            {
                name: 'OfficeManage',
                path: '/officeManage',
                component: OfficeManage
            },
            {
                name: 'AddOffice',
                path: '/addOffice',
                component: AddOffice
            },
            {
                name: 'OfficeDetails',
                path: '/officeDetails',
                component: OfficeDetails
            },
            {
                name: 'FinanceInfo',
                path: '/financeInfo',
                component: FinanceInfo
            },
            {
                name: 'FinanceInfo_Check',
                path: '/financeInfo_check',
                component: FinanceInfo_Check
            },
            {
                name: 'CargoInsurance',
                path: '/cargoInsurance',
                component: CargoInsurance
            },
            {
                name: 'CarrierInsurance',
                path: '/carrierInsurance',
                component: CarrierInsurance
            },
            {
                name: 'EmployerInsurance',
                path: '/employerInsurance',
                component: EmployerInsurance
            },{
                name: 'UploadCorrection',
                path: '/uploadCorrection',
                component: UploadCorrection
            },
            {
                name: 'AddCargoInsurance',
                path: '/addCargoInsurance',
                component: AddCargoInsurance
            },
            {
                name: 'CarInfo',
                path: '/carInfo',
                component: CarInfo
            },
            {
                name: 'DriverInfo',
                path: '/driverInfo',
                component: DriverInfo
            },
            {
                name: 'InsuranceDetails',
                path: '/insuranceDetails',
                component: InsuranceDetails
            },
            {
                name: 'UploadEndorsement',
                path: '/uploadEndorsement',
                component: UploadEndorsement
            },
            {
                name: 'EndorsementDetails',
                path: '/endorsementDetails',
                component: EndorsementDetails
            }
        ]
    }
];
export default routes;

