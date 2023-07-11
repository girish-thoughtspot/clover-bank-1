import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import chart1 from '../../assets/Chart_01.png';
import chart2 from '../../assets/Chart_02.png';
import chart3 from '../../assets/Chart_03.png';
import chart4 from '../../assets/Chart_04.png';
import chart5 from '../../assets/Chart_05.png';
import './Home.css';

export const Home = () => {
    const navigate = useNavigate();

    return <div className="home">
        <img src={chart1} height={400} onClick={() => navigate('/analyze')}></img>
        <img src={chart2} height={400}></img>
        <img src={chart3} height={400}></img>
        <img src={chart4} height={400}></img>
        <img src={chart5} height={400}></img>
    </div>
}