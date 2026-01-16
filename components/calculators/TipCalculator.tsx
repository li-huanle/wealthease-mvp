'use client';

import { useState } from 'react';
import { DollarSign, Users, Plus, Minus, RefreshCw } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Person {
  name: string;
  billShare: number;
  tipShare: number;
  totalShare: number;
}

export default function TipCalculator() {
  const t = useTranslations('calculator.tip');
  const [billAmount, setBillAmount] = useState<string>('');
  const [tipPercentage, setTipPercentage] = useState<number>(15);
  const [customTip, setCustomTip] = useState<string>('');
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
  const [people, setPeople] = useState<Person[]>([{ name: 'Person 1', billShare: 0, tipShare: 0, totalShare: 0 }]);
  const [useCustomTip, setUseCustomTip] = useState<boolean>(false);

  const handleQuickTip = (percentage: number) => {
    setUseCustomTip(false);
    setTipPercentage(percentage);
    setCustomTip('');
  };

  const handleCustomTipChange = (value: string) => {
    setCustomTip(value);
    setUseCustomTip(true);
    const customPercent = parseFloat(value) || 0;
    setTipPercentage(customPercent);
  };

  const handlePeopleChange = (num: number) => {
    if (num < 1) num = 1;
    if (num > 50) num = 50;

    const newPeople: Person[] = [];
    for (let i = 0; i < num; i++) {
      newPeople.push({
        name: `Person ${i + 1}`,
        billShare: 0,
        tipShare: 0,
        totalShare: 0,
      });
    }
    setNumberOfPeople(num);
    setPeople(newPeople);
  };

  const calculateTip = () => {
    const bill = parseFloat(billAmount) || 0;
    const tip = bill * (tipPercentage / 100);
    const total = bill + tip;

    if (numberOfPeople === 1) {
      setPeople([{
        name: t('results.person'),
        billShare: bill,
        tipShare: tip,
        totalShare: total,
      }]);
    } else {
      const billPerPerson = bill / numberOfPeople;
      const tipPerPerson = tip / numberOfPeople;
      const totalPerPerson = total / numberOfPeople;

      const newPeople = people.map((person, index) => ({
        ...person,
        billShare: Math.round(billPerPerson * 100) / 100,
        tipShare: Math.round(tipPerPerson * 100) / 100,
        totalShare: Math.round(totalPerPerson * 100) / 100,
      }));
      setPeople(newPeople);
    }
  };

  const handlePersonBillChange = (index: number, value: string) => {
    const newPeople = [...people];
    const billShare = parseFloat(value) || 0;
    newPeople[index].billShare = billShare;
    newPeople[index].tipShare = billShare * (tipPercentage / 100);
    newPeople[index].totalShare = billShare + newPeople[index].tipShare;
    setPeople(newPeople);
  };

  const resetCalculator = () => {
    setBillAmount('');
    setTipPercentage(15);
    setCustomTip('');
    setNumberOfPeople(1);
    setPeople([{ name: t('results.person'), billShare: 0, tipShare: 0, totalShare: 0 }]);
    setUseCustomTip(false);
  };

  const bill = parseFloat(billAmount) || 0;
  const tip = bill * (tipPercentage / 100);
  const total = bill + tip;

  const quickTipOptions = [10, 12, 15, 18, 20, 25];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Form Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{t('form.title')}</h2>
          <button
            onClick={resetCalculator}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            title={t('form.reset')}
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Bill Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.billAmount')}
            </label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                onInput={calculateTip}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all text-lg"
              />
            </div>
          </div>

          {/* Number of People */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.numberOfPeople')}
            </label>
            <div className="relative">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <div className="flex items-center">
                <button
                  onClick={() => handlePeopleChange(numberOfPeople - 1)}
                  disabled={numberOfPeople <= 1}
                  className="p-2 text-gray-500 hover:text-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <input
                  type="number"
                  value={numberOfPeople}
                  onChange={(e) => handlePeopleChange(parseInt(e.target.value) || 1)}
                  min="1"
                  max="50"
                  className="w-24 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all text-lg text-center"
                />
                <button
                  onClick={() => handlePeopleChange(numberOfPeople + 1)}
                  disabled={numberOfPeople >= 50}
                  className="p-2 text-gray-500 hover:text-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tip Percentage */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t('form.tipPercentage')}
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {quickTipOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleQuickTip(option)}
                className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                  !useCustomTip && tipPercentage === option
                    ? 'bg-primary-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option}%
              </button>
            ))}
            <input
              type="number"
              value={customTip}
              onChange={(e) => handleCustomTipChange(e.target.value)}
              placeholder={t('form.custom')}
              step="1"
              min="0"
              max="100"
              className={`py-3 px-4 rounded-xl font-semibold text-center transition-all ${
                useCustomTip
                  ? 'bg-primary-600 text-white shadow-lg ring-2 ring-primary-300'
                  : 'bg-gray-100 text-gray-700 focus:bg-gray-200 focus:ring-2 focus:ring-primary-300'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Main Results */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-4 opacity-90">{t('results.title')}</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm opacity-80">{t('results.tipAmount')}</p>
              <p className="text-4xl font-bold">${tip.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm opacity-80">{t('results.totalAmount')}</p>
              <p className="text-4xl font-bold">${total.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Per Person Breakdown */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {numberOfPeople === 1 ? t('results.total') : t('results.perPerson')}
          </h3>
          <div className="space-y-3">
            {numberOfPeople === 1 ? (
              <>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">{t('results.bill')}</span>
                  <span className="text-xl font-bold text-gray-900">${bill.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">{t('results.tip')}</span>
                  <span className="text-xl font-bold text-primary-600">${tip.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-primary-50 rounded-xl border-2 border-primary-200">
                  <span className="text-gray-700 font-medium">{t('results.total')}</span>
                  <span className="text-xl font-bold text-primary-600">${total.toFixed(2)}</span>
                </div>
              </>
            ) : (
              people.map((person, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{person.name}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">{t('results.bill')}</p>
                      <p className="font-semibold text-gray-900">${person.billShare.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">{t('results.tip')}</p>
                      <p className="font-semibold text-primary-600">${person.tipShare.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">{t('results.total')}</p>
                      <p className="font-semibold text-primary-600">${person.totalShare.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{t('tips.title')}</h3>
        <div className="space-y-4">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <p className="font-medium text-gray-900">{t('tips.tip1.title')}</p>
              <p className="text-gray-600">{t('tips.tip1.content')}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl">📱</span>
            <div>
              <p className="font-medium text-gray-900">{t('tips.tip2.title')}</p>
              <p className="text-gray-600">{t('tips.tip2.content')}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl">🌍</span>
            <div>
              <p className="font-medium text-gray-900">{t('tips.tip3.title')}</p>
              <p className="text-gray-600">{t('tips.tip3.content')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
