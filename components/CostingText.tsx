import { Colors } from '@/styles';
import React from 'react';
import { StyleSheet, Text, type TextProps } from 'react-native';
import { useTheme } from 'react-native-paper';

export enum CostingTextFontFamily {
    OPEN_SANS = 'OpenSans',
    OPEN_SANS_MEDIUM = 'OpenSans',
    OPEN_SANS_BOLD = 'OpenSansBold'
}

enum CostingTextType {
    BOLD = 'bold',
    DEFAULT = 'default',
    TITLE = 'title',
    MEDIUM = 'medium',
    SUBTITLE = 'subtitle',
    LINK = 'link'
}

interface CostingTextProps extends TextProps {
    type?: `${CostingTextType}`;
    color?: keyof Colors
}

export default React.forwardRef(function CostingText({ children, type = CostingTextType.DEFAULT, style, color = 'onSurface', ...rest }: CostingTextProps,ref : any){
    const { colors } = useTheme();
    return (
        <Text 
            ref={ref}
            style={[
            { color: colors[color] as any },
            type === CostingTextType.DEFAULT ? styles.default : undefined,
            type === CostingTextType.TITLE ? styles.title : undefined,
            type === CostingTextType.MEDIUM ? styles.medium : undefined,
            type === CostingTextType.BOLD ? styles.bold : undefined,
            type === CostingTextType.SUBTITLE ? styles.subtitle : undefined,
            type === CostingTextType.LINK ? styles.link : undefined,
            style
        ]}
            {...rest}
        >
            {children}
        </Text>
    );
});

const styles = StyleSheet.create({
    default: {
        fontSize: 16,
        fontFamily: CostingTextFontFamily.OPEN_SANS
    },
    medium: {
        fontSize: 16,
        fontFamily: CostingTextFontFamily.OPEN_SANS_MEDIUM
    },
    bold: {
        fontSize: 16,
        fontFamily: CostingTextFontFamily.OPEN_SANS_BOLD
    },
    title: {
        fontSize: 36,
        //lineHeight: 36,
        fontFamily: CostingTextFontFamily.OPEN_SANS_BOLD
        
    },
    subtitle: {
        fontSize: 24,
        fontFamily: CostingTextFontFamily.OPEN_SANS_BOLD
    },
    link: {
        lineHeight: 30,
        fontSize: 16,
        color: '#0a7ea4',
        fontFamily: CostingTextFontFamily.OPEN_SANS
    },
});
