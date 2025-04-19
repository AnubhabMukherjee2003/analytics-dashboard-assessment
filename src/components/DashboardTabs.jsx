import { Tab } from '@headlessui/react';
import { motion } from 'framer-motion';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const DashboardTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: 'overview', name: 'Overview' },
    { key: 'vehicles', name: 'Vehicles' },
    { key: 'geography', name: 'Geography' },
    { key: 'details', name: 'Detailed Analysis' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-2 mb-6">
      <Tab.Group selectedIndex={tabs.findIndex(tab => tab.key === activeTab)} onChange={(index) => setActiveTab(tabs[index].key)}>
        <Tab.List className="flex space-x-2 rounded-xl bg-primary-100 p-1">
          {tabs.map((tab) => (
            <Tab
              key={tab.key}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-colors',
                  'ring-white ring-opacity-60 ring-offset-2 focus:outline-none',
                  selected
                    ? 'bg-white text-primary-700 shadow'
                    : 'text-primary-500 hover:bg-primary-200 hover:text-primary-800'
                )
              }
            >
              {tab.name}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  );
};

export default DashboardTabs;