import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PaymentIcon from '@mui/icons-material/Payment';
import TranslateIcon from '@mui/icons-material/Translate';
import CheckIcon from '@mui/icons-material/Check';
import AddCardIcon from '@mui/icons-material/AddCard';
import InstagramIcon from '@mui/icons-material/Instagram';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const icons = {
	close: CloseIcon,
	menu: MenuIcon,
	pinned: PushPinIcon,
	euro: EuroSymbolIcon,
	unpinned: PushPinOutlinedIcon,
	delete: DeleteIcon,
	add: AddIcon,
	edit: EditIcon,
	expandLess: ExpandLessIcon,
	expandMore: ExpandMoreIcon,
	payment: PaymentIcon,
	language: TranslateIcon,
	check: CheckIcon,
	pay: AddCardIcon,
	instagram: InstagramIcon,
	'arrow-right': ArrowForwardIcon,
	'arrow-left': ArrowBackIcon,
	clock: AccessTimeIcon,
	location: LocationOnOutlinedIcon,
	email: EmailOutlinedIcon
};

export type Icons = keyof typeof icons;
export { icons };
