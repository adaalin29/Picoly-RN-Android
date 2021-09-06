import EStyleSheet from 'react-native-extended-stylesheet';
import { Platform, Dimensions } from 'react-native';

export default EStyleSheet.create({

    // WELCOME
    welcomeContainer: {
        width: '100%',
        flex: 1,
        backgroundColor: '$mainRed',
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcomeContent: {
        width: '90%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcomeTextMare: {
        fontFamily: 'OpenSans-SemiBold',
        color: "#fff",
        fontSize: 28,
        textTransform: 'uppercase'
    },
    welcomeTextNumeRestaurant: {
        fontFamily: 'OpenSans-SemiBold',
        color: "#fff",
        fontSize: 20,
        width: '80%',
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    welcomeTextMic: {
        width: '80%',
        marginTop: 10,
        textAlign: 'center',
        fontFamily: 'OpenSans-Regular',
        color: "#fff",
        fontSize: 15,
    },
    welcomeScaneazaButon: {
        width: '90%',
        backgroundColor: '#fff',
        paddingVertical: 12,
        borderRadius: 5,
        marginTop: 20,
    },
    welcomeScaneazaButonText: {
        fontFamily: 'OpenSans-SemiBold',
        textAlign: 'center',
        color: '$mainRed',
        textTransform: 'uppercase',
    },
    welcomeDemoButon: {
        paddingVertical: 5,
        paddingHorizontal: 30,
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 5,
        position: 'absolute',
        bottom: 30,
    },
    welcomeDemoButonText: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 14,
        color: "#fff",
        textTransform: 'uppercase'
    },

    // HEADER
    mainHeaderContainer: {
        backgroundColor: '$mainRed',
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    subHeaderContainer: {
        width: '100%',
        height: 120,
        position: 'relative'
    },
    subHeaderImageBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        bottom: 0,
        resizeMode: 'stretch'
    },
    subHeaderTextOver: {
        position: 'absolute',
        width: '100%',
        left: 0,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    headerOpenedMenuContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: '#fff',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        overflow: 'hidden',
        zIndex: 20,
    },
    headerOpenedMenuBackgroundImage: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
        height: '100%',
        left: 0,
        bottom: 0,
        resizeMode: 'cover'
    },
    headerOpenedMenuCloseImage: {
        position: 'absolute',
        width: 30,
        height: 40,
        resizeMode: 'contain',
        padding: 5,
        right: 20,
        top: 25,
    },
    headerOpenedMenuContent: {
        top: '20%',
        padding: 20
    },
    headerOpenedMenuLogo: {
        width: '70%',
        resizeMode: 'contain'
    },
    headerOpenedMenuText: {
        fontFamily: "OpenSans-Regular",
        marginTop: 30,
        fontSize: 16,
        textTransform: 'uppercase',
        color: '$gray',
        marginLeft: 55
    },

    // FOOTER
    footerContainer: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 20, height: 20 },
        shadowOpacity: 1,
        elevation: 10,
        backgroundColor: '#fff',
        zIndex: 99,
    },
    footerItem: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerItemText: {
        textTransform: 'uppercase',
        color: '$gray',
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 11
    },

    // DASHBOARD
    dashboardMenuItems: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    dashboardMenuItem: {
        width: '40%',
        height: 130,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 20, height: 20 },
        shadowOpacity: 1,
        elevation: 10,
        zIndex: 3,
        backgroundColor: '#fff',
    },
    dashboardMenuItemStop: {
        width: '40%',
        height: 130,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 20, height: 20 },
        shadowOpacity: 1,
        elevation: 10,
        zIndex: 3,
        backgroundColor: '#fff',
    },
    dashboardMenuItemText: {
        width: '80%',
        color: '$mainRed',
        textAlign: 'center',
        marginTop: 10,
        fontFamily: 'OpenSans-SemiBold',
        textTransform: 'uppercase',
        fontSize: 12
    },
    waiterCalledModal: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    waiterCalledModalContainer: {
        flexGrow: 0,
        width: '80%',
        maxHeight: (6 / 10) * Dimensions.get('window').height,
        minHeight: (4 / 10) * Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        padding: 20,
        paddingTop: 60,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: '#fff'
    },
    waiterCalledModalClose: {
        position: 'absolute',
        width: 30,
        height: 30,
        right: 20,
        top: 20,
        padding: 5
    },
    waiterCalledModalTextMare: {
        fontFamily: 'OpenSans-SemiBold',
        color: "#000",
        fontSize: 20,
        textTransform: 'uppercase',
        textAlign: 'center',
        marginBottom: 20
    },
    waiterCalledModalTextMic: {
        width: '90%',
        textAlign: 'center',
        fontFamily: 'OpenSans-Regular',
        color: "#000",
        fontSize: 12
    },
    waiterCalledModalButtons: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    waiterCalledModalButton: {
        width: '48%',
        borderWidth: 2,
        borderColor: '$mainRed',
        borderRadius: 5,
        padding: 5
    },
    waiterCalledModalButtonText: {
        textAlign: 'center',
        color: '$mainRed',
        fontFamily: 'OpenSans-SemiBold',
        textTransform: 'uppercase'
    },
    waiterCalledModalSmallText: {
        fontFamily: 'OpenSans-Regular',
        color: '$gray',
        fontSize: 12,
        textAlign: 'center'
    },

    // FEEDBACK
    goBackContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    goBackImage: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
        marginRight: 10
    },
    goBackText: {
        fontFamily: 'OpenSans-SemiBold',
        textTransform: 'uppercase',
        color: '$gray',
        fontSize: 15
    },
    feedbackInfo: {
        color: '$gray',
        fontFamily: 'OpenSans-Regular',
        marginVertical: 10,
        fontSize: 13
    },
    feedBackInputContainer: {
        marginBottom: 10
    },
    feedBackInputText: {
        fontFamily: 'OpenSans-Regular',
        color: '#000',
        fontSize: 13,
        marginBottom: 7
    },
    servingText: {
        color: '$gray',
        fontSize: 12,
        fontFamily: 'OpenSans-Regular'
    },
    feedBackAlteInfo: {
        backgroundColor: '#EEEEEE',
        height: 100,
        fontFamily: 'OpenSans-Regular',
        color: '#000',
        fontSize: 13
    },
    feedbackSendButton: {
        backgroundColor: '$mainRed',
        paddingVertical: 10,
        borderRadius: 5
    },
    feedbackSendText: {
        color: '#fff',
        fontFamily: 'OpenSans-SemiBold',
        textAlign: 'center',
        textTransform: 'uppercase'
    },

    // OFFERS
    offerItemContainer: {
        width: '100%',
        marginBottom: 20
    },
    offerImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover'
    },
    offerTitle: {
        color: '$mainRed',
        fontFamily: 'OpenSans-SemiBold',
        textTransform: 'uppercase',
        fontSize: 20,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    offerDesc: {
        color: '#000',
        fontFamily: 'OpenSans-Regular',
        fontSize: 13,
        paddingHorizontal: 20,
    },
    longTextStyle: {
        color: '#000',
        fontFamily: 'OpenSans-Regular',
        fontSize: 13
    },

    // STATIC PAGES
    longTextStyle: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 13,
        marginTop: 20
    },

    // HELP
    swiperContainer: {
        width: '100%',
        height: (5.3 / 10) * Dimensions.get('window').height,
        marginTop: 20,
        marginBottom: 50
    },
    swiperSlide: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    swiperImageCont: {
        width: '100%',
        height: 200,
    },
    slideTitle: {
        color: '#000',
        textAlign: 'center',
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 18,
        textTransform: 'uppercase',
        width: '90%',
    },
    slideDesc: {
        color: '$gray',
        width: '70%',
        textAlign: 'center',
        fontFamily: 'OpenSans-Regular',
        fontSize: 13,
    },
    helpTreciPeste: {
        color: '$mainRed',
        textAlign: 'center',
        fontFamily: 'OpenSans-Regular'
    },

    // QR CODE
    qrCodeBackground: {
        flex: 1,
        width: '100%',
        paddingTop: 30,
        backgroundColor: '$mainRed',
        // justifyContent: 'center',
        alignItems: 'center'
    },
    qrCodeSkip: {
        backgroundColor: '#fff',
        marginTop: 20,
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    qrCodeSkipText: {
        color: '$mainRed',
        textTransform: 'uppercase',
        fontFamily: 'OpenSans-SemiBold'
    },
    confirmModalThickBoxImage: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
    },
    confirmModalThickBox: {
        width: 25,
        height: 25,
        backgroundColor: '#ecf0f5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        borderRadius: 5,
    },
    btnOffersMenu: {
        position: 'relative',
        bottom: 0,
        width: '49%',
        marginTop: 15,
        marginBottom: 15,
        borderWidth: 2,
        borderColor: 'red',
        borderRadius: 5,
    },
    btnOffersMenuActive: {
        position: 'relative',
        bottom: 0,
        width: '49%',
        marginTop: 15,
        marginBottom: 15,
        borderWidth: 2,
        borderColor: 'red',
        borderRadius: 5,
        backgroundColor: 'red',
    },
    helpTreciPesteActive: {
        color: '#ffffff',
        textAlign: 'center',
        fontFamily: 'OpenSans-Regular'
    },
    languagePicker: {
        width: 300,
        height: 50,
        fontFamily: "OpenSans-Regular",
        marginTop: 30,
        fontSize: 16,
        textTransform: 'uppercase',
        color: '$gray',
        backgroundColor: 'white',
        marginLeft: 10,
    },
    itemPicker: {
        fontFamily: "OpenSans-Regular",
        marginTop: 30,
        fontSize: 16,
        textTransform: 'uppercase',
        color: '$gray',
    },
    languageContainer: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 55,
    },
    languageText: {
        fontFamily: "OpenSans-Regular",
        marginTop: 30,
        fontSize: 16,
        color: '$gray',
    },
    menuItemTitle: {
        fontSize: 16,
        fontFamily: 'OpenSans-SemiBold',
        color: '#fff',
        marginBottom: 10,
        opacity: 1,
    },
    menuItemDescription: {
        fontSize: 12,
        fontFamily: 'OpenSans-Regular',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 15,
        opacity: 1,
    },
    menuItemButton: {
        fontSize: 14,
        fontFamily: 'OpenSans-SemiBold',
        color: '#fff',
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 5,
        textTransform: 'uppercase',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        opacity: 1,
    },
    goBack: {
        fontSize: 14,
        fontFamily: 'OpenSans-SemiBold',
        color: '#fff',
        paddingLeft: 10,
    },
    foodTitile: {
        fontSize: 18,
        fontFamily: 'OpenSans-Bold',
        color: '#000',
    },
    foodDescription: {
        // width: '80%',
        fontSize: 12,
        fontFamily: 'OpenSans-Regular',
        color: '#000',
        marginTop: 20,
        marginBottom: 20,
    },
    foodPrice: {
        fontSize: 16,
        fontFamily: 'OpenSans-Bold',
        color: '#000',
        // textTransform: 'uppercase',
    },
    menuItemContainer: {
        flex: 1,
        padding: 15,
        paddingTop: 0,
        minHeight: 200
    },
    productDetailsTitle: {
        fontSize: 18,
        fontFamily: 'OpenSans-Bold',
        color: '#E32340',
        paddingTop: 15,
    },
    productDetailsDescription: {
        fontSize: 12,
        fontFamily: 'OpenSans-Regular',
        color: '#545454',
        paddingTop: 15,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    productDetailsTag: {
        fontSize: 12,
        fontFamily: 'OpenSans-Regular',
        color: '#545454',
        paddingLeft: 10,
    },
    productDetailsCustomFieldText: {
        fontSize: 12,
        fontFamily: 'OpenSans-Regular',
        color: '#545454',
    },
    plusMinus: {
        fontSize: 18,
        fontFamily: 'OpenSans-Bold',
        color: '#E32340',
    },
    quantity: {
        fontSize: 18,
        fontFamily: 'OpenSans-Bold',
        color: '#8A8A8A',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    mealType: {
        fontSize: 10,
        fontFamily: 'OpenSans-SemiBold',
        color: '#505050',
    },
    addCart: {
        fontSize: 14,
        fontFamily: 'OpenSans-Bold',
        color: '#E32340',
    },
    textInput: {
        // width: '90%',
        // backgroundColor: '#000000',
        borderRadius: 5,
        marginBottom: '3%',
        borderWidth: 0,
        height: 50,
        paddingLeft: 10,
    },
    btnComanda: {
        fontSize: 11,
        fontFamily: 'OpenSans-SemiBold',
        color: '#fff',
        textTransform: 'uppercase',
        padding: 10,
    },
    customField: {
        fontSize: 12,
        fontFamily: 'OpenSans-SemiBold',
        color: '#545454',
    },
    offerDescription: {
        fontSize: 14,
        fontFamily: 'OpenSans-Regular',
    },
    cartTitle: {
        fontSize: 18,
        fontFamily: 'OpenSans-Bold',
        color: '#E32340',
        padding: 20,
    },
    cartItemTitle: {
        fontSize: 16,
        fontFamily: 'OpenSans-Bold',
        color: '#E32340',
    },
    cartItemDescription: {
        fontSize: 12,
        fontFamily: 'OpenSans-Regular',
        color: '#545454',
        width: '80%',
        paddingBottom: 10,
    },
    cartItemQuantity: {
        fontSize: 16,
        fontFamily: 'OpenSans-Bold',
        color: '#000000',
        opacity: 0.5,
        paddingRight: 20,
    },
    cartItemPrice: {
        fontSize: 16,
        fontFamily: 'OpenSans-Bold',
        color: '#000',
    },
    otherDetails: {
        fontSize: 14,
        fontFamily: 'OpenSans-Regular',
        color: '#000',
        paddingLeft: 20,
        paddingBottom: 5,
    },
    otherDetailsInput: {
        backgroundColor: '#F5F6FA',
        padding: 20,
        margin: 20,
        marginTop: 0,
        fontSize: 14,
        fontFamily: 'OpenSans-Regular',
        color: '#000',
    },
    cartTotal: {
        fontSize: 18,
        fontFamily: 'OpenSans-SemiBold',
        color: '#000',
    },
    cartTotalPrice: {
        fontSize: 18,
        fontFamily: 'OpenSans-Bold',
        color: '#000',
        marginBottom: 20,
    },
    sendButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        backgroundColor: '#E32340',
        borderRadius: 5,
        height: 35,
    },
    sendButtonText: {
        fontSize: 14,
        fontFamily: 'OpenSans-Bold',
        color: '#fff',
    },
    cartModalTitle: {
        fontSize: 22,
        fontFamily: 'OpenSans-Bold',
        color: '#E32340',
        textTransform: 'uppercase',
        alignSelf: 'center',
        textAlign: 'center',
    },
    cartModalMessage: {
        fontSize: 14,
        fontFamily: 'OpenSans-Regular',
        color: '#000',
        marginTop: 20,
        marginBottom: 20,
        alignSelf: 'center',
        textAlign: 'center',
    },
    cartModalButton: {
        flex: 1,
        height: 34,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#E32340',
        borderRadius: 5,
    },
    cartModalButtonText: {
        fontSize: 13,
        fontFamily: 'OpenSans-SemiBold',
        color: '#E32340',
        textTransform: 'uppercase',
    },
    sendButtonText: {
        fontSize: 15,
        fontFamily: 'OpenSans-SemiBold',
        color: '#fff',
        textTransform: 'uppercase',
    },
    footerCartText: {
        fontSize: 14,
        fontFamily: 'OpenSans-Bold',
        color: '#fff',
    },
});