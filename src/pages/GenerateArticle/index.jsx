import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';

// Constants
import { models } from '../../constants';


const GenerateArticle = () => {
    const [model, setModel] = useState(models[0].value);
    const [articleLength, setArticleLength] = useState(100);
    const [article, setArticle] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);

    const handleArticleLengthInput = (e) => {
        setArticleLength(e.target.value);
    }

    const handleChange = (e) => {
        setModel(e.target.value);
    };

    const handleInput = (e) => {
        setTitle(e.target.value);
    }

    const handleGenerate = async () => {
        try {
            setLoading(true);
            const length = articleLength >= getSelectedModel().maxToken - 7
                ? getSelectedModel().maxToken - 7
                : articleLength

            const requestBody = {
                prompt: `Generate Article about: ${title}.`,
                temperature: 0,
                top_p: 1,
                max_tokens: +length,
                model: model,
            };

            const response = await fetch(`${process.env.REACT_APP_OPEN_AI_BASE_URL}/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_API_KEY}`
                },
                body: JSON.stringify(requestBody)
            });

            const responseJson = await response.json();
            setArticle(responseJson.choices[0].text.replace('\n\n', '') || 'Not Found');

            setLoading(false);
        } catch (e) {
            setLoading(false);

            console.error(e);
        }
    }

    const getSelectedModel = () => {
        return models.find(el => el.value === model);
    }

    const modelList = (
        models.map((model, index) => {
            return (
                <MenuItem key={index} value={model.value}>
                    {model.name}
                </MenuItem>
            )
        })
    );

    return (
        <Box>
            <Typography sx={{ mt: 3, mb: 5 }} variant="h4" textAlign="center">
                Type Article Title and Select Generate Settings
            </Typography>

            <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
                <FormControl fullWidth size="small">
                    <InputLabel id="demo-select-small-label">Engine</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={model}
                        label="Engine"
                        onChange={handleChange}
                    >
                        {modelList}
                    </Select>
                    <FormHelperText>Please, select engine</FormHelperText>
                </FormControl>

                <TextField
                    fullWidth
                    size="small"
                    id="outlined-number"
                    label="Article Length"
                    type="number"
                    value={articleLength}
                    onInput={handleArticleLengthInput}
                    inputProps={{ maxLength: getSelectedModel().maxToken }}
                    helperText={`Set Article length. Maximum length of ${getSelectedModel().name} is ${getSelectedModel().maxToken}`}
                />
            </Stack>

            <Stack spacing={2} direction="row">
                <TextField
                    fullWidth
                    value={title}
                    size="small"
                    id="outlined-basic"
                    label="Article Title"
                    variant="outlined"
                    helperText="Please, add Article title and start generating"
                    onInput={handleInput}
                />

                <LoadingButton
                    sx={{ height: 40 }}
                    loading={loading}
                    variant="outlined"
                    size="small"
                    disabled={!title}
                    onClick={handleGenerate}
                >
                    <span>Generate</span>
                </LoadingButton>
            </Stack>

            <TextField
                fullWidth
                multiline
                minRows={5}
                label="Article"
                sx={{ mt: 2 }}
                value={article}
                disabled={!article}
            />
        </Box>
    );
}

export default GenerateArticle;