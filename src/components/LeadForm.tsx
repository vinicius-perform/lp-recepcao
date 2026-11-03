import React, { useState } from 'react';
import { ArrowRight, Lock, AlertCircle } from 'lucide-react';
import { LeadFormData, FormErrors } from '../types';
import { maskPhone, isValidPhone, isValidEmail, isValidFullName, normalizeInstagram, isValidInstagram } from '../utils/mask';

interface LeadFormProps {
  onSubmitSuccess: (data: LeadFormData) => void;
  onOpenPrivacyModal: () => void;
  onOpenTermsModal: () => void;
}

export const LeadForm: React.FC<LeadFormProps> = ({
  onSubmitSuccess,
  onOpenPrivacyModal,
  onOpenTermsModal,
}) => {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    whatsapp: '',
    email: '',
    instagram: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (field: keyof LeadFormData, value: string): string | undefined => {
    switch (field) {
      case 'fullName':
        if (!value.trim()) return 'Informe seu nome completo';
        if (!isValidFullName(value)) return 'Digite nome e sobrenome';
        return undefined;

      case 'whatsapp':
        if (!value.trim()) return 'Informe seu WhatsApp com DDD';
        if (!isValidPhone(value)) return 'WhatsApp inválido. Ex: (11) 98765-4321';
        return undefined;

      case 'email':
        if (!value.trim()) return 'Informe seu e-mail';
        if (!isValidEmail(value)) return 'Digite um e-mail válido';
        return undefined;

      case 'instagram':
        if (!value.trim()) return 'Informe o Instagram profissional ou da clínica';
        if (!isValidInstagram(value)) return 'Instagram inválido (ex: @suaclinica)';
        return undefined;

      default:
        return undefined;
    }
  };

  const handleChange = (field: keyof LeadFormData, rawValue: string) => {
    let value = rawValue;
    if (field === 'whatsapp') {
      value = maskPhone(rawValue);
    }

    setFormData((prev) => ({ ...prev, [field]: value }));

    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field: keyof LeadFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    let value = formData[field];
    if (field === 'instagram') {
      value = normalizeInstagram(value);
      setFormData((prev) => ({ ...prev, instagram: value }));
    }
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedData = {
      ...formData,
      instagram: normalizeInstagram(formData.instagram),
    };

    const newErrors: FormErrors = {
      fullName: validateField('fullName', normalizedData.fullName),
      whatsapp: validateField('whatsapp', normalizedData.whatsapp),
      email: validateField('email', normalizedData.email),
      instagram: validateField('instagram', normalizedData.instagram),
    };

    setTouched({
      fullName: true,
      whatsapp: true,
      email: true,
      instagram: true,
    });

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((err) => !!err);
    if (hasErrors) {
      return;
    }

    setIsSubmitting(true);

    try {
      onSubmitSuccess(normalizedData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="formulario-compra"
      className="w-full bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-card relative transition-all"
    >
      {/* Decorative top subtle border accent */}
      <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />

      {/* Form Header */}
      <div className="mb-6">
        <span className="inline-block text-[11px] font-bold tracking-widest-editorial text-gold-deep uppercase mb-2">
          LIBERE SEU ACESSO
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-graphite tracking-tight font-sans">
          Tenha os 120 scripts na sua recepção.
        </h2>
        <p className="text-sm text-secondary mt-1">
          Preencha seus dados para continuar sua compra de R$ 19,90.
        </p>
      </div>

      {/* Form Elements */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Nome Completo */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-xs font-semibold uppercase tracking-wider text-graphite mb-1.5"
          >
            Nome completo <span className="text-gold-deep">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            autoComplete="name"
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            onBlur={() => handleBlur('fullName')}
            placeholder="Seu nome e sobrenome"
            className={`w-full px-4 py-3 text-sm rounded-xl border bg-ivory/60 text-graphite focus:bg-white focus:outline-none focus:ring-2 transition-all ${
              errors.fullName && touched.fullName
                ? 'border-red-400 focus:ring-red-200'
                : 'border-border focus:border-gold focus:ring-gold/20'
            }`}
          />
          {errors.fullName && touched.fullName && (
            <p className="flex items-center gap-1 text-xs text-red-600 mt-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.fullName}</span>
            </p>
          )}
        </div>

        {/* WhatsApp */}
        <div>
          <label
            htmlFor="whatsapp"
            className="block text-xs font-semibold uppercase tracking-wider text-graphite mb-1.5"
          >
            WhatsApp <span className="text-gold-deep">*</span>
          </label>
          <input
            id="whatsapp"
            type="tel"
            name="whatsapp"
            autoComplete="tel"
            value={formData.whatsapp}
            onChange={(e) => handleChange('whatsapp', e.target.value)}
            onBlur={() => handleBlur('whatsapp')}
            placeholder="(00) 00000-0000"
            className={`w-full px-4 py-3 text-sm rounded-xl border bg-ivory/60 text-graphite focus:bg-white focus:outline-none focus:ring-2 transition-all ${
              errors.whatsapp && touched.whatsapp
                ? 'border-red-400 focus:ring-red-200'
                : 'border-border focus:border-gold focus:ring-gold/20'
            }`}
          />
          {errors.whatsapp && touched.whatsapp && (
            <p className="flex items-center gap-1 text-xs text-red-600 mt-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.whatsapp}</span>
            </p>
          )}
        </div>

        {/* E-mail */}
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-semibold uppercase tracking-wider text-graphite mb-1.5"
          >
            E-mail de acesso <span className="text-gold-deep">*</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            placeholder="seuemail@exemplo.com"
            className={`w-full px-4 py-3 text-sm rounded-xl border bg-ivory/60 text-graphite focus:bg-white focus:outline-none focus:ring-2 transition-all ${
              errors.email && touched.email
                ? 'border-red-400 focus:ring-red-200'
                : 'border-border focus:border-gold focus:ring-gold/20'
            }`}
          />
          {errors.email && touched.email && (
            <p className="flex items-center gap-1 text-xs text-red-600 mt-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Instagram */}
        <div>
          <label
            htmlFor="instagram"
            className="block text-xs font-semibold uppercase tracking-wider text-graphite mb-1.5"
          >
            Instagram profissional ou da clínica <span className="text-gold-deep">*</span>
          </label>
          <input
            id="instagram"
            type="text"
            name="instagram"
            autoComplete="off"
            value={formData.instagram}
            onChange={(e) => handleChange('instagram', e.target.value)}
            onBlur={() => handleBlur('instagram')}
            placeholder="@seuinstagram"
            className={`w-full px-4 py-3 text-sm rounded-xl border bg-ivory/60 text-graphite focus:bg-white focus:outline-none focus:ring-2 transition-all ${
              errors.instagram && touched.instagram
                ? 'border-red-400 focus:ring-red-200'
                : 'border-border focus:border-gold focus:ring-gold/20'
            }`}
          />
          {errors.instagram && touched.instagram && (
            <p className="flex items-center gap-1 text-xs text-red-600 mt-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.instagram}</span>
            </p>
          )}
        </div>

        {/* CTA Principal */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-[54px] bg-graphite hover:bg-graphite-dark active:scale-[0.99] text-white font-bold text-sm sm:text-base tracking-wide rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-btn group cursor-pointer"
          >
            <span>QUERO ACESSAR POR R$ 19,90</span>
            <ArrowRight className="w-4 h-4 text-gold-soft group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Microcopy abaixo do botão */}
        <div className="pt-2 text-center">
          <p className="text-xs text-secondary flex items-center justify-center gap-1.5 flex-wrap">
            <Lock className="w-3 h-3 text-gold-deep inline" />
            <span>Pagamento único</span>
            <span className="text-border">•</span>
            <span>Checkout seguro</span>
            <span className="text-border">•</span>
            <span>Sem mensalidade</span>
          </p>

          <div className="mt-2.5 text-[11px] text-secondary flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={onOpenPrivacyModal}
              className="hover:text-graphite underline underline-offset-2 transition-colors cursor-pointer"
            >
              Política de Privacidade
            </button>
            <span className="text-border">•</span>
            <button
              type="button"
              onClick={onOpenTermsModal}
              className="hover:text-graphite underline underline-offset-2 transition-colors cursor-pointer"
            >
              Termos de Compra
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
