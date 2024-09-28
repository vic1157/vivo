import { FaUpload, FaHome, FaVials, FaStickyNote, FaComments, FaUser, FaCog, FaPeace } from 'react-icons/fa'; // Font Awesome

// Now use these icons as components
export const UploadIcon = ({ className }: { className?: string }) => (
    <FaUpload className={className} />
);

export const PeaceIcon = ({ className }: { className?: string }) => (
    <FaPeace className={className} />
);

export const HomeIcon = ({ className }: { className?: string }) => (
    <FaHome className={className} />
);

export const LabReportIcon = ({ className }: { className?: string }) => (
    <FaVials className={className} />
);

export const NotesIcon = ({ className }: { className?: string }) => (
    <FaStickyNote className={className} />
);

export const ChatIcon = ({ className }: { className?: string }) => (
    <FaComments className={className} />
);

export const AccountIcon = ({ className }: { className?: string }) => (
    <FaUser className={className} />
);

export const SettingsIcon = ({ className }: { className?: string }) => (
    <FaCog className={className} />
);


