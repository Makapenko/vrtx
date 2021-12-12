import GroupControl from './GroupControl';

function App() {
  return (
    <div style={{ 'width': '600px', 'margin': '20px' }}>
      <GroupControl label='Группа' values={['Первый', 'Второй', 'Третий']} selected='0' />
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem maxime corrupti accusamus modi laudantium, eveniet repellendus quaerat blanditiis recusandae voluptatem illo, ratione culpa amet odio voluptatibus natus! Molestiae, ipsum assumenda.</div>
    </div>

  )
}

export default App;
