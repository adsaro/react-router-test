import { useEffect, useMemo, useState } from "react";
import { response, type RankItem } from "./response";
import { Link, Route, Switch, useLocation, useRouteMatch } from "react-router-dom";

const RankingTable: React.FC = () => {
  const location = useLocation();
  const match = useRouteMatch();
  console.log(location.pathname, match)
  useEffect(() => {
    console.log(window.location)
  },)
  return <Switch>
    {['rank', 'name', 'points', 'age'].map(param => {
      return <Route key={param} path={`/${param}`}><SortedTable items={response.list} sortParam={param as keyof RankItem}/></Route>
    })}
    <Route path='/'><SortedTable items={response.list} /></Route>
  </Switch>
};

const SortedTable = ({items, sortParam}: {items: RankItem[], sortParam?: keyof RankItem}) => {
  const [param, setParam] = useState(sortParam)
  const sortedItems = useMemo(() => items.slice().sort((a, b) => {
    switch (param) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'points':
          return a.points - b.points;
        case 'age':
          return a.age - b.age;
        case 'rank':
          return a.rank - b.rank;
        default:
          return 0;
      }
  }), [param, items])
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap gap-2 mb-6">
        <Link
          to={location => ({...location, pathname: '/rank'})}
          className={`px-4 py-2 rounded-md transition-colors`}
        >
          <button onClick={() => setParam('rank')}>Rank</button>
        </Link>
        <Link
          to="/name"
          className={`px-4 py-2 rounded-md transition-colors`}
        >
          <button onClick={() => setParam('name')}>Name</button>
        </Link>
        <Link
          to="/points"
          className={`px-4 py-2 rounded-md transition-colors}`}
        >
          <button onClick={() => setParam('points')}>Points</button>
        </Link>
        <Link
          to="/age"
          className={`px-4 py-2 rounded-md transition-colors`}
        >
          <button onClick={() => setParam('age')}>Age</button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Rank</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Points</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Age</th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((item) => (
              <tr 
                key={item.rank} 
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4 text-sm font-medium text-gray-900">{item.rank}</td>
                <td className="py-3 px-4 text-sm text-gray-800">{item.name}</td>
                <td className="py-3 px-4 text-sm text-gray-800">{item.points}</td>
                <td className="py-3 px-4 text-sm text-gray-800">{item.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RankingTable;