import Toolbar from '../Toolbar';
import NewButton from '../Buttons/NewPage';

const CustomToolbar = ({ onClickNewPage }) => {
  return <Toolbar buttons={[<NewButton name="novo" onClick={onClickNewPage} />]} />;
};

export default CustomToolbar;
