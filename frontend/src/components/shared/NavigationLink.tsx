import { Link } from "react-router-dom";

type Props = {
  to: string;
  bg: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
};
const NavigationLink = (props: Props) => {
  const handleHover = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const target = event.currentTarget as HTMLAnchorElement;
    target.style.backgroundColor = props.bg; // Set background color on hover
    target.style.color = props.textColor; // Set text color on hover
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const target = event.currentTarget as HTMLAnchorElement;
    target.style.backgroundColor = 'white'; // Reset background color on mouse leave
    target.style.color = 'black'; // Reset text color on mouse leave
  };
  return (
    <Link
      onMouseEnter={handleMouseLeave}
      onMouseLeave={handleHover}
      className="nav-link"
      to={props.to}
      style={{ background: props.bg, color: props.textColor}}
      onClick={props.onClick}
    >
      {props.text}
    </Link>
  );
};

export default NavigationLink;
