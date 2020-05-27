export default function translate(context, key) {
    return context.props.intl.formatMessage({ id: key });
}