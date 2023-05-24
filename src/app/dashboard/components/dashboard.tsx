import { useTranslation, Trans } from 'react-i18next';

const Dashboard = () => {
    const { t } = useTranslation();

    return (
        <div>
            <h1>
                <Trans i18nKey="DASHBOARD.TITLE" />
            </h1>
            <p>{t('COMMON.YES')}</p>
        </div>
    );
};

export default Dashboard;
