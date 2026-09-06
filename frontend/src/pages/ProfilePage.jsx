import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Heart,
  Droplet,
  Scale,
  Ruler,
  AlertOctagon,
  Save,
  CheckCircle2,
  ShieldCheck,
  Plus,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Toast } from '../components/common/Toast';

export const ProfilePage = () => {
  const { user, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || 'Alex Morgan',
    email: user?.email || 'alex.morgan@healthmail.com',
    phone: user?.phone || '+1 (555) 234-8765',
    dob: user?.dob || '1992-05-14',
    gender: user?.gender || 'Female',
    bloodGroup: user?.bloodGroup || 'O+',
    height: user?.height?.replace(/[^0-9.]/g, '') || '168',
    weight: user?.weight?.replace(/[^0-9.]/g, '') || '64',
    emergencyName: user?.emergencyContact?.name || 'David Morgan',
    emergencyRelation: user?.emergencyContact?.relationship || 'Spouse',
    emergencyPhone: user?.emergencyContact?.phone || '+1 (555) 987-6543'
  });

  const [allergies, setAllergies] = useState(user?.allergies || ['Penicillin', 'Peanuts']);
  const [newAllergy, setNewAllergy] = useState('');

  const [conditions, setConditions] = useState(user?.conditions || ['Mild Seasonal Asthma']);
  const [newCondition, setNewCondition] = useState('');

  const [toastMessage, setToastMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Compute BMI dynamically
  const heightMeters = parseFloat(formData.height) / 100;
  const weightKg = parseFloat(formData.weight);
  const calculatedBmi =
    heightMeters > 0 && weightKg > 0
      ? (weightKg / (heightMeters * heightMeters)).toFixed(1)
      : '22.7';

  const getBmiCategory = (bmi) => {
    const num = parseFloat(bmi);
    if (num < 18.5) return { label: 'Underweight', color: 'text-amber-600' };
    if (num < 25) return { label: 'Normal / Healthy Weight', color: 'text-emerald-600' };
    if (num < 30) return { label: 'Overweight', color: 'text-amber-600' };
    return { label: 'Obese Range', color: 'text-rose-600' };
  };

  const handleAddAllergy = (e) => {
    e.preventDefault();
    if (newAllergy.trim() && !allergies.includes(newAllergy.trim())) {
      setAllergies([...allergies, newAllergy.trim()]);
      setNewAllergy('');
    }
  };

  const handleRemoveAllergy = (item) => {
    setAllergies(allergies.filter((a) => a !== item));
  };

  const handleAddCondition = (e) => {
    e.preventDefault();
    if (newCondition.trim() && !conditions.includes(newCondition.trim())) {
      setConditions([...conditions, newCondition.trim()]);
      setNewCondition('');
    }
  };

  const handleRemoveCondition = (item) => {
    setConditions(conditions.filter((c) => c !== item));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      updateProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        height: `${formData.height} cm`,
        weight: `${formData.weight} kg`,
        bmi: calculatedBmi,
        allergies,
        conditions,
        emergencyContact: {
          name: formData.emergencyName,
          relationship: formData.emergencyRelation,
          phone: formData.emergencyPhone
        }
      });

      setIsSaving(false);
      setToastMessage('Personal health profile updated successfully!');
    }, 400);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header and Save Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <User className="w-6 h-6 text-emerald-700" />
            <span>Patient Health Profile</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage your personal clinical baseline, vital dimensions, and emergency contacts
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md shadow-emerald-900/10 transition-all flex items-center gap-2 cursor-pointer w-fit"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving Profile...' : 'Save Health Profile'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Core Demographics Card */}
        <div className="health-card p-6 bg-white border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-700" />
            <span>Personal Demographic Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Biological Sex / Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden font-medium text-slate-800"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Non-Binary">Non-Binary</option>
                <option value="Prefer not to say">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Blood Group Type
              </label>
              <select
                value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden font-medium text-slate-800"
              >
                <option value="A+">A Positive (A+)</option>
                <option value="A-">A Negative (A-)</option>
                <option value="B+">B Positive (B+)</option>
                <option value="B-">B Negative (B-)</option>
                <option value="AB+">AB Positive (AB+)</option>
                <option value="AB-">AB Negative (AB-)</option>
                <option value="O+">O Positive (O+)</option>
                <option value="O-">O Negative (O-)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Biometrics & Dynamic BMI Calculator */}
        <div className="health-card p-6 bg-white border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <Scale className="w-4 h-4 text-emerald-700" />
            <span>Body Biometrics & Real-Time BMI</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Height (cm)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="50"
                  max="250"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden font-medium"
                />
                <span className="absolute right-3 top-2 text-xs text-slate-400 font-semibold">cm</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Weight (kg)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="20"
                  max="300"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden font-medium"
                />
                <span className="absolute right-3 top-2 text-xs text-slate-400 font-semibold">kg</span>
              </div>
            </div>

            {/* Dynamic Calculated BMI Display */}
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                Calculated BMI
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-extrabold text-emerald-950">{calculatedBmi}</span>
                <span className={`text-xs font-bold ${getBmiCategory(calculatedBmi).color}`}>
                  {getBmiCategory(calculatedBmi).label}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Allergies & Chronic Conditions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Allergies Card */}
          <div className="health-card p-6 bg-white border border-slate-200 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-rose-600" />
              <span>Documented Allergies</span>
            </h3>

            <div className="flex flex-wrap gap-2 min-h-12">
              {allergies.map((allergy) => (
                <span
                  key={allergy}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200"
                >
                  <span>{allergy}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAllergy(allergy)}
                    className="p-0.5 hover:text-rose-950 rounded-full"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={newAllergy}
                onChange={(e) => setNewAllergy(e.target.value)}
                placeholder="Add allergy (e.g. Latex, Sulfa)..."
                className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-hidden"
              />
              <button
                type="button"
                onClick={handleAddAllergy}
                className="px-3 py-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-900 text-white rounded-xl transition-colors cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>

          {/* Chronic Conditions Card */}
          <div className="health-card p-6 bg-white border border-slate-200 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
              <Heart className="w-4 h-4 text-emerald-700" />
              <span>Chronic Health Conditions</span>
            </h3>

            <div className="flex flex-wrap gap-2 min-h-12">
              {conditions.map((condition) => (
                <span
                  key={condition}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200"
                >
                  <span>{condition}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCondition(condition)}
                    className="p-0.5 hover:text-emerald-950 rounded-full"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={newCondition}
                onChange={(e) => setNewCondition(e.target.value)}
                placeholder="Add condition (e.g. Hypertension)..."
                className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-hidden"
              />
              <button
                type="button"
                onClick={handleAddCondition}
                className="px-3 py-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-900 text-white rounded-xl transition-colors cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="health-card p-6 bg-white border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-700" />
            <span>Emergency Contact Details</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Contact Name
              </label>
              <input
                type="text"
                value={formData.emergencyName}
                onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Relationship
              </label>
              <input
                type="text"
                value={formData.emergencyRelation}
                onChange={(e) => setFormData({ ...formData, emergencyRelation: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={formData.emergencyPhone}
                onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl font-medium"
              />
            </div>
          </div>
        </div>

        {/* Bottom Save Action */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Profile Changes'}</span>
          </button>
        </div>
      </form>

      {/* Toast Notification */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setToastMessage('')}
        />
      )}
    </div>
  );
};
