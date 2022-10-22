import './PlayerCard.css';

const colorNames = {
    '#ff0000': 'red',
    '#00ff00': 'gree',
    '#0000ff': 'blue',
    '#00ffff': 'cyan',
    '#ffffff': 'white'
};

export function PlayerCard({ name, color, validColors, removePlayer, setColor }) {
    return (
        <div
            style={{
                marginTop: '10px',
                marginBottom: '10px',
                padding: '10px',
                border: '3px solid white',
                position: 'relative',
                backgroundColor: '#111'
            }}
        >
            <span id="showColor" style={{ backgroundColor: color }}></span>
            <span style={{ marginRight: '25px', marginLeft: '30px' }}>Name: {name},</span>
            Color:
            <select onChange={(e) => setColor(e.target.value)} style={{ padding: '0px', verticalAlign: 'center' }}>
                <option defaultValue={color}>{colorNames[color]}</option>
                {validColors.map((color) => (
                    <option key={colorNames[color]} value={color}>
                        {colorNames[color]}
                    </option>
                ))}
            </select>
            <span className="delete" onClick={removePlayer(name)}>
                x
            </span>
        </div>
    );
}
