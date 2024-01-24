import logo from './../../../assets/img/black_logo.png';

interface LogoProps {
    size: number;
}

export const Logo: React.FC<LogoProps> = (props: LogoProps) => {
    const {size} = props;
    return (
        <img src={logo} alt="manege logo" width={size} height={size} />
    )
}