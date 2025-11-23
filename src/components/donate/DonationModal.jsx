import React, { useState } from 'react';
import { CreditCard, Smartphone, Plus, Check, Share2, X } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import './DonationModal.css';

const VALUES = [1, 5, 10, 20, 50];

export const DonationModal = ({ isOpen, onClose, campaign }) => {
    const [step, setStep] = useState('amount'); // amount, payment, success
    const [amount, setAmount] = useState('');
    const [customAmount, setCustomAmount] = useState('');
    const [coverFees, setCoverFees] = useState(false);

    const handleAmountSelect = (val) => {
        setAmount(val);
        setCustomAmount('');
    };

    const handleCustomAmountChange = (e) => {
        setCustomAmount(e.target.value);
        setAmount('');
    };

    const getFinalAmount = () => {
        const base = Number(amount || customAmount);
        return coverFees ? base * 1.03 : base;
    };

    const handleDonate = () => {
        setStep('payment');
    };

    const handleConfirmPayment = () => {
        // Simulate API call
        setTimeout(() => {
            setStep('success');
        }, 1000);
    };

    const resetFlow = () => {
        setStep('amount');
        setAmount('');
        setCustomAmount('');
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={resetFlow}
            title={step === 'amount' ? `Doe para ${campaign?.user?.name || 'Campanha'}` : step === 'payment' ? 'Método de Pagamento' : ''}
        >
            {/* Step 1: Amount Selection */}
            {step === 'amount' && (
                <div className="donation-step">
                    <div className="campaign-mini-header">
                        <p className="campaign-mini-title">{campaign?.title}</p>
                        <div className="campaign-mini-progress">
                            <div className="progress-bar-sm">
                                <div className="progress-fill-sm" style={{ width: '65%' }}></div>
                            </div>
                            <span className="progress-text-sm">Meta: R$ {campaign?.goal}</span>
                        </div>
                    </div>

                    <h4 className="step-label">Escolha o valor</h4>
                    <div className="values-grid">
                        {VALUES.map(val => (
                            <button
                                key={val}
                                className={`value-btn ${amount === val ? 'selected' : ''}`}
                                onClick={() => handleAmountSelect(val)}
                            >
                                R$ {val}
                            </button>
                        ))}
                        <button
                            className={`value-btn ${customAmount ? 'selected' : ''}`}
                            onClick={() => setAmount('')}
                        >
                            Outro
                        </button>
                    </div>

                    <div className="custom-amount-input">
                        <Input
                            placeholder="R$ 0,00"
                            type="number"
                            value={customAmount}
                            onChange={handleCustomAmountChange}
                            onFocus={() => setAmount('')}
                        />
                    </div>

                    <label className="fees-checkbox">
                        <input
                            type="checkbox"
                            checked={coverFees}
                            onChange={(e) => setCoverFees(e.target.checked)}
                        />
                        <span className="checkbox-text">
                            Cobrir taxas (+3%) para que {campaign?.user?.name} receba o valor integral
                        </span>
                    </label>

                    <Button
                        variant="primary"
                        fullWidth
                        disabled={!amount && !customAmount}
                        onClick={handleDonate}
                    >
                        CONTINUAR
                    </Button>
                </div>
            )}

            {/* Step 2: Payment Method */}
            {step === 'payment' && (
                <div className="donation-step">
                    <div className="payment-methods">
                        <button className="payment-method-card" onClick={handleConfirmPayment}>
                            <CreditCard size={24} />
                            <div className="method-info">
                                <span className="method-title">Cartão de Crédito</span>
                                <span className="method-desc">•••• 1234</span>
                            </div>
                            <div className="method-arrow">→</div>
                        </button>

                        <button className="payment-method-card" onClick={handleConfirmPayment}>
                            <div className="pix-icon">💠</div>
                            <div className="method-info">
                                <span className="method-title">PIX</span>
                                <span className="method-desc">Instantâneo</span>
                            </div>
                            <div className="method-arrow">→</div>
                        </button>

                        <button className="payment-method-card" onClick={handleConfirmPayment}>
                            <Smartphone size={24} />
                            <div className="method-info">
                                <span className="method-title">Carteira Digital</span>
                                <span className="method-desc">PicPay, Mercado Pago</span>
                            </div>
                            <div className="method-arrow">→</div>
                        </button>
                    </div>

                    <div className="payment-summary">
                        <div className="summary-row">
                            <span>Doação</span>
                            <span>R$ {Number(amount || customAmount).toFixed(2)}</span>
                        </div>
                        {coverFees && (
                            <div className="summary-row">
                                <span>Taxas</span>
                                <span>R$ {(Number(amount || customAmount) * 0.03).toFixed(2)}</span>
                            </div>
                        )}
                        <div className="summary-total">
                            <span>Total</span>
                            <span>R$ {getFinalAmount().toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Step 3: Success */}
            {step === 'success' && (
                <div className="donation-success">
                    <div className="success-animation">
                        <div className="success-circle">
                            <Check size={48} color="white" />
                        </div>
                    </div>

                    <h2 className="success-title">Doação realizada!</h2>
                    <p className="success-msg">
                        Você doou <strong>R$ {Number(amount || customAmount).toFixed(2)}</strong> para {campaign?.user?.name}.
                    </p>

                    <div className="impact-card">
                        <span className="impact-emoji">🎉</span>
                        <p className="impact-text">
                            Você é incrível! Com essa doação, a meta está 5% mais próxima.
                        </p>
                    </div>

                    <Button variant="primary" fullWidth className="share-btn">
                        <Share2 size={20} />
                        COMPARTILHAR NO FEED
                    </Button>

                    <Button variant="ghost" fullWidth onClick={resetFlow}>
                        FECHAR
                    </Button>
                </div>
            )}
        </Modal>
    );
};
