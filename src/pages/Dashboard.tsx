import React, { useState } from 'react';
import { Plus, Activity, Package, Users } from 'lucide-react';
import { useExtensionStore } from '../store/useExtensionStore';
import StatCard from '../components/dashboard/StatCard';
import ExtensionList from '../components/dashboard/ExtensionList';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import NewExtensionForm from '../components/forms/NewExtensionForm';

const Dashboard = () => {
  const { extensions } = useExtensionStore();
  const [showNewExtensionForm, setShowNewExtensionForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button
          icon={Plus}
          onClick={() => setShowNewExtensionForm(true)}
        >
          New Extension
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Extensions"
          value={extensions.length}
          Icon={Package}
          color={{ bg: 'bg-blue-100', text: 'text-blue-600' }}
        />
        <StatCard
          title="Active Projects"
          value={extensions.filter((e) => e.status === 'in_progress').length}
          Icon={Activity}
          color={{ bg: 'bg-green-100', text: 'text-green-600' }}
        />
        <StatCard
          title="Published"
          value={extensions.filter((e) => e.status === 'published').length}
          Icon={Users}
          color={{ bg: 'bg-purple-100', text: 'text-purple-600' }}
        />
      </div>

      {showNewExtensionForm ? (
        <Card title="Create New Extension">
          <NewExtensionForm />
        </Card>
      ) : (
        <Card title="Recent Extensions">
          {extensions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No extensions created yet.</p>
              <Button
                variant="outline"
                icon={Plus}
                onClick={() => setShowNewExtensionForm(true)}
              >
                Create your first extension
              </Button>
            </div>
          ) : (
            <ExtensionList extensions={extensions} limit={5} />
          )}
        </Card>
      )}
    </div>
  );
};

export default Dashboard;