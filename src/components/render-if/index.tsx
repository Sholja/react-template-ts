import PropTypes from 'prop-types';

interface IProps {
    show?: boolean;
    children: React.ReactNode;
}

const RenderIf = ({ show, children }: IProps) => {
    if (show) {
        return children;
    }

    return null;
};

RenderIf.propTypes = {
    show: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

RenderIf.defaultProps = {
    show: false,
};

export default RenderIf;
